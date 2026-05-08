import { json, md5, requireDuitkuEnv } from "../../_duitku.js"

export async function onRequestPost({ request, env }) {
  const envCheck = requireDuitkuEnv(env)
  if (!envCheck.ok) return envCheck.response

  const form = await request.formData()
  const merchantCode = String(form.get("merchantCode") || "")
  const amount = String(form.get("amount") || "")
  const merchantOrderId = String(form.get("merchantOrderId") || "")
  const signature = String(form.get("signature") || "")
  const expected = md5(`${merchantCode}${amount}${merchantOrderId}${envCheck.config.apiKey}`)

  if (!merchantCode || !amount || !merchantOrderId || !signature || signature !== expected) {
    return json({ message: "Invalid callback signature." }, { status: 400 })
  }

  return json({ ok: true })
}
