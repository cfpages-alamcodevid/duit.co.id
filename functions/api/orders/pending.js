import { json } from "../../_duitku.js"
import { requireUser } from "../../_auth.js"
import { ensureD1User } from "../../_user.js"

export async function onRequestGet({ request, env }) {
  const auth = await requireUser(request, env)
  if (!auth.ok) return auth.response

  if (!env.DB) {
    return json({ message: "Database belum tersedia." }, { status: 503 })
  }

  await ensureD1User(env.DB, auth)

  const url = new URL(request.url)
  const courseSlug = String(url.searchParams.get("courseSlug") || "").trim()
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 10), 1), 20)

  const baseQuery = `
    SELECT
      merchant_order_id,
      product_id,
      product_name,
      product_type,
      course_slug,
      amount_idr,
      duitku_reference,
      duitku_payment_method,
      duitku_payment_code,
      duitku_payment_url,
      status,
      created_at,
      updated_at
    FROM orders
    WHERE clerk_user_id = ?
      AND product_type = 'course'
      AND status IN ('pending', 'callback_received')
  `

  const query = courseSlug
    ? `${baseQuery} AND course_slug = ? ORDER BY created_at DESC LIMIT ?`
    : `${baseQuery} ORDER BY created_at DESC LIMIT ?`

  const statement = env.DB.prepare(query)
  const result = courseSlug
    ? await statement.bind(auth.userId, courseSlug, limit).all()
    : await statement.bind(auth.userId, limit).all()

  return json({ orders: result.results || [] })
}
