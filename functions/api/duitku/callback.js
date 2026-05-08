import { json, md5, requireDuitkuEnv } from "../../_duitku.js"

export async function onRequestPost({ request, env }) {
  const envCheck = requireDuitkuEnv(env)
  if (!envCheck.ok) return envCheck.response

  const form = await request.formData()
  const merchantCode = String(form.get("merchantCode") || "")
  const amount = String(form.get("amount") || "")
  const merchantOrderId = String(form.get("merchantOrderId") || "")
  const signature = String(form.get("signature") || "")
  const resultCode = String(form.get("resultCode") || "")
  const expected = md5(`${merchantCode}${amount}${merchantOrderId}${envCheck.config.apiKey}`)

  if (!merchantCode || !amount || !merchantOrderId || !signature || signature !== expected) {
    return json({ message: "Invalid callback signature." }, { status: 400 })
  }

  if (env.DB) {
    const status = resultCode === "00" ? "paid" : "callback_received"
    await env.DB.prepare(
      `UPDATE orders SET
        status = ?,
        raw_callback_response = ?,
        paid_at = CASE WHEN ? = 'paid' THEN CURRENT_TIMESTAMP ELSE paid_at END,
        updated_at = CURRENT_TIMESTAMP
       WHERE merchant_order_id = ?`,
    )
      .bind(status, JSON.stringify(Object.fromEntries(form.entries())), status, merchantOrderId)
      .run()

    if (status === "paid") {
      const order = await env.DB.prepare("SELECT id, clerk_user_id, course_slug FROM orders WHERE merchant_order_id = ?")
        .bind(merchantOrderId)
        .first()

      if (order?.clerk_user_id && order?.course_slug) {
        await env.DB.prepare(
          `INSERT INTO course_enrollments (clerk_user_id, course_slug, order_id, access_status, access_source)
           VALUES (?, ?, ?, 'active', 'purchase')
           ON CONFLICT(clerk_user_id, course_slug) DO UPDATE SET
             access_status = 'active',
             order_id = excluded.order_id`,
        )
          .bind(order.clerk_user_id, order.course_slug, order.id)
          .run()
      }
    }
  }

  return json({ ok: true })
}
