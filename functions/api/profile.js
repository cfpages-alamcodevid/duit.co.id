import { requireUser } from "../_auth.js"
import { json } from "../_duitku.js"
import { ensureD1User } from "../_user.js"

function normalizeProfile(body) {
  const countryCode = String(body.whatsappCountryCode || "+62")
  const nationalNumber = String(body.whatsappNationalNumber || "").replace(/\D/g, "")

  return {
    email: String(body.email || "").trim(),
    fullName: String(body.fullName || "").trim(),
    imageUrl: String(body.imageUrl || "").trim(),
    birthdayDate: body.birthdayDate ? String(body.birthdayDate) : null,
    whatsappCountry: String(body.whatsappCountry || "ID"),
    whatsappCountryCode: countryCode,
    whatsappNationalNumber: nationalNumber,
    whatsappE164: nationalNumber ? `${countryCode}${nationalNumber}` : "",
  }
}

async function getUser(db, userId) {
  return db.prepare("SELECT * FROM users WHERE clerk_user_id = ?").bind(userId).first()
}

export async function onRequestGet({ request, env }) {
  const auth = await requireUser(request, env)
  if (!auth.ok) return auth.response
  if (!env.DB) return json({ message: "Database profil belum tersedia." }, { status: 503 })

  await ensureD1User(env.DB, auth)
  const profile = await getUser(env.DB, auth.userId)
  return json({ profile })
}

export async function onRequestPost({ request, env }) {
  const auth = await requireUser(request, env)
  if (!auth.ok) return auth.response
  if (!env.DB) return json({ message: "Database profil belum tersedia." }, { status: 503 })

  const body = await request.json().catch(() => ({}))
  const profile = normalizeProfile(body)
  await ensureD1User(env.DB, auth, profile)
  const existing = await getUser(env.DB, auth.userId)

  if (
    existing?.birthday_date &&
    profile.birthdayDate &&
    existing.birthday_date !== profile.birthdayDate
  ) {
    return json(
      { message: "Tanggal lahir sudah terkunci dan tidak bisa diubah." },
      { status: 409 },
    )
  }

  const shouldSetBirthday = !existing?.birthday_date && profile.birthdayDate

  await env.DB.prepare(
    `UPDATE users SET
      email = ?,
      full_name = ?,
      image_url = ?,
      birthday_date = CASE
        WHEN birthday_date IS NULL AND ? IS NOT NULL THEN ?
        ELSE birthday_date
      END,
      birthday_locked_at = CASE
        WHEN birthday_locked_at IS NULL AND ? IS NOT NULL THEN CURRENT_TIMESTAMP
        ELSE birthday_locked_at
      END,
      whatsapp_country = ?,
      whatsapp_country_code = ?,
      whatsapp_national_number = ?,
      whatsapp_e164 = ?,
      updated_at = CURRENT_TIMESTAMP,
      last_seen_at = CURRENT_TIMESTAMP
    WHERE clerk_user_id = ?`,
  )
    .bind(
      profile.email,
      profile.fullName,
      profile.imageUrl,
      shouldSetBirthday ? profile.birthdayDate : null,
      shouldSetBirthday ? profile.birthdayDate : null,
      shouldSetBirthday ? profile.birthdayDate : null,
      profile.whatsappCountry,
      profile.whatsappCountryCode,
      profile.whatsappNationalNumber,
      profile.whatsappE164,
      auth.userId,
    )
    .run()

  await env.DB.prepare(
    `INSERT INTO user_events (clerk_user_id, event_name, entity_type, entity_id, metadata_json)
     VALUES (?, 'profile_updated', 'user', ?, ?)`,
  )
    .bind(
      auth.userId,
      auth.userId,
      JSON.stringify({
        birthdaySet: Boolean(shouldSetBirthday),
        whatsappUpdated: Boolean(profile.whatsappE164),
      }),
    )
    .run()

  const updated = await getUser(env.DB, auth.userId)
  return json({ profile: updated })
}
