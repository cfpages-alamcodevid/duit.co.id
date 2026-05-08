import { requireUser } from "../_auth.js"
import { json } from "../_duitku.js"
import { ensureD1User, normalizeTier, roleForTier, TIER_ORDER } from "../_user.js"

function numberFromBody(value) {
  const parsed = Number(String(value ?? "").replace(/[^\d.-]/g, ""))
  return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0
}

function tierFromNumbers({ monthlyIncome, totalAssets, hasHighDebt }) {
  let tier = "tier-1-hustler"

  if (hasHighDebt || monthlyIncome < 5_000_000) {
    tier = "tier-0-survival"
  } else if (monthlyIncome < 10_000_000) {
    tier = "tier-1-hustler"
  } else if (monthlyIncome < 100_000_000) {
    tier = "tier-2-scaler"
  } else if (monthlyIncome < 1_000_000_000) {
    tier = "tier-3-asset-builder"
  } else {
    tier = "tier-4-legacy"
  }

  if (totalAssets >= 50_000_000_000) return "tier-4-legacy"
  if (totalAssets >= 5_000_000_000 && TIER_ORDER[tier] < 3) return "tier-3-asset-builder"
  if (totalAssets >= 500_000_000 && TIER_ORDER[tier] < 2) return "tier-2-scaler"

  return tier
}

function tierFromBusinessRevenue(revenue) {
  if (revenue >= 1_000_000_000) return "tier-4-legacy"
  if (revenue >= 100_000_000) return "tier-3-asset-builder"
  if (revenue >= 10_000_000) return "tier-2-scaler"
  return null
}

async function getUser(db, userId) {
  return db.prepare("SELECT * FROM users WHERE clerk_user_id = ?").bind(userId).first()
}

export async function onRequestPost({ request, env }) {
  const auth = await requireUser(request, env)
  if (!auth.ok) return auth.response
  if (!env.DB) return json({ message: "Database tier belum tersedia." }, { status: 503 })

  const body = await request.json().catch(() => ({}))
  const existing = await ensureD1User(env.DB, auth, {
    email: String(body.email || "").trim(),
    fullName: String(body.fullName || "").trim(),
    imageUrl: String(body.imageUrl || "").trim(),
  })

  const currentTier = normalizeTier(existing?.income_tier)
  const quizType = body.quizType === "business_upgrade" ? "business_upgrade" : "initial"
  const monthlyIncome = numberFromBody(body.monthlyIncomeIdr)
  const totalAssets = numberFromBody(body.totalAssetsIdr)
  const monthlyBusinessRevenue = numberFromBody(body.monthlyBusinessRevenueIdr)
  const hasHighDebt = Boolean(body.hasHighDebt)
  const businessConfirmed = Boolean(body.businessConfirmed)

  let nextTier = currentTier
  let source = "homepage_quiz"

  if (quizType === "business_upgrade") {
    const businessTier = businessConfirmed ? tierFromBusinessRevenue(monthlyBusinessRevenue) : null
    if (businessTier && TIER_ORDER[businessTier] > TIER_ORDER[currentTier]) {
      nextTier = businessTier
      source = "self_confirmed_business"
    }
  } else {
    nextTier = tierFromNumbers({ monthlyIncome, totalAssets, hasHighDebt })
  }

  const accessRole = roleForTier(nextTier)
  const businessName = String(body.businessName || "").trim()
  const businessType = String(body.businessType || "").trim()
  const businessUrl = String(body.businessUrl || "").trim()
  const quizPayload = {
    quizType,
    monthlyIncomeIdr: monthlyIncome || null,
    totalAssetsIdr: totalAssets || null,
    hasHighDebt,
    monthlyBusinessRevenueIdr: monthlyBusinessRevenue || null,
    businessName,
    businessType,
    businessUrl,
    businessConfirmed,
    previousTier: currentTier,
    assignedTier: nextTier,
    accessRole,
    submittedAt: new Date().toISOString(),
  }

  await env.DB.prepare(
    `UPDATE users SET
      income_tier = ?,
      access_role = ?,
      tier_source = ?,
      tier_updated_at = CURRENT_TIMESTAMP,
      monthly_income_idr = CASE WHEN ? > 0 THEN ? ELSE monthly_income_idr END,
      total_assets_idr = CASE WHEN ? > 0 THEN ? ELSE total_assets_idr END,
      monthly_business_revenue_idr = CASE WHEN ? > 0 THEN ? ELSE monthly_business_revenue_idr END,
      business_name = COALESCE(NULLIF(?, ''), business_name),
      business_type = COALESCE(NULLIF(?, ''), business_type),
      business_url = COALESCE(NULLIF(?, ''), business_url),
      business_verified_self_at = CASE
        WHEN ? = 1 AND ? >= 10000000 THEN CURRENT_TIMESTAMP
        ELSE business_verified_self_at
      END,
      quiz_result_json = ?,
      updated_at = CURRENT_TIMESTAMP,
      last_seen_at = CURRENT_TIMESTAMP
    WHERE clerk_user_id = ?`,
  )
    .bind(
      nextTier,
      accessRole,
      source,
      monthlyIncome,
      monthlyIncome,
      totalAssets,
      totalAssets,
      monthlyBusinessRevenue,
      monthlyBusinessRevenue,
      businessName,
      businessType,
      businessUrl,
      businessConfirmed ? 1 : 0,
      monthlyBusinessRevenue,
      JSON.stringify(quizPayload),
      auth.userId,
    )
    .run()

  await env.DB.prepare(
    `INSERT INTO user_tier_events (
      clerk_user_id, previous_tier, assigned_tier, access_role, source, quiz_type, metadata_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      auth.userId,
      currentTier,
      nextTier,
      accessRole,
      source,
      quizType,
      JSON.stringify(quizPayload),
    )
    .run()

  const profile = await getUser(env.DB, auth.userId)
  return json({ profile, tier: nextTier, accessRole })
}

