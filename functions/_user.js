export const TIER_ORDER = {
  "tier-0-survival": 0,
  "tier-1-hustler": 1,
  "tier-2-scaler": 2,
  "tier-3-asset-builder": 3,
  "tier-4-legacy": 4,
}

export const TIER_ROLE = {
  "tier-0-survival": "survival",
  "tier-1-hustler": "hustler",
  "tier-2-scaler": "scaler",
  "tier-3-asset-builder": "asset_builder",
  "tier-4-legacy": "legacy",
}

export function normalizeTier(tier) {
  return Object.prototype.hasOwnProperty.call(TIER_ORDER, tier) ? tier : "tier-0-survival"
}

export function roleForTier(tier) {
  return TIER_ROLE[normalizeTier(tier)]
}

export function profileFromClaims(claims = {}) {
  const email =
    claims.email ||
    claims.email_address ||
    claims.primary_email_address ||
    claims?.public_metadata?.email ||
    ""
  const fullName =
    claims.name ||
    claims.full_name ||
    [claims.given_name, claims.family_name].filter(Boolean).join(" ") ||
    ""
  const imageUrl = claims.picture || claims.image_url || ""

  return {
    email: String(email || "").trim(),
    fullName: String(fullName || "").trim(),
    imageUrl: String(imageUrl || "").trim(),
  }
}

export async function ensureD1User(db, auth, fallback = {}) {
  const userId = typeof auth === "string" ? auth : auth?.userId
  if (!db || !userId) return null

  const claimProfile = profileFromClaims(auth?.claims)
  const email = fallback.email || claimProfile.email || null
  const fullName = fallback.fullName || claimProfile.fullName || null
  const imageUrl = fallback.imageUrl || claimProfile.imageUrl || null

  await db
    .prepare(
      `INSERT INTO users (
        clerk_user_id, email, full_name, image_url, income_tier, access_role,
        tier_source, created_at, updated_at, last_seen_at
      )
       VALUES (?, ?, ?, ?, 'tier-0-survival', 'survival', 'self_heal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT(clerk_user_id) DO UPDATE SET
         email = COALESCE(NULLIF(?, ''), email),
         full_name = COALESCE(NULLIF(?, ''), full_name),
         image_url = COALESCE(NULLIF(?, ''), image_url),
         income_tier = COALESCE(income_tier, 'tier-0-survival'),
         access_role = COALESCE(access_role, 'survival'),
         tier_source = COALESCE(tier_source, 'self_heal'),
         last_seen_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP`,
    )
    .bind(userId, email, fullName, imageUrl, email, fullName, imageUrl)
    .run()

  return db.prepare("SELECT * FROM users WHERE clerk_user_id = ?").bind(userId).first()
}

