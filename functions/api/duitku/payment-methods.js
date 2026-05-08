import { duitkuDateTime, getProduct, json, requireDuitkuEnv, sha256Hex } from "../../_duitku.js"

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url)
  const productId = url.searchParams.get("productId")
  const product = getProduct(productId)

  if (!product) {
    return json({ message: "Kelas tidak ditemukan." }, { status: 404 })
  }

  const envCheck = requireDuitkuEnv(env)
  if (!envCheck.ok) return envCheck.response

  const { merchantCode, apiKey, baseUrl } = envCheck.config
  const datetime = duitkuDateTime()
  const signature = await sha256Hex(`${merchantCode}${product.price}${datetime}${apiKey}`)
  const duitkuResponse = await fetch(`${baseUrl}/paymentmethod/getpaymentmethod`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchantcode: merchantCode,
      amount: product.price,
      datetime,
      signature,
    }),
  })
  const data = await duitkuResponse.json().catch(() => ({}))

  if (!duitkuResponse.ok) {
    return json(
      { message: data.Message || data.message || "Metode pembayaran belum bisa dimuat." },
      { status: duitkuResponse.status },
    )
  }

  return json({
    paymentMethods: data.paymentFee || data.paymentMethods || data.paymentMethod || [],
    raw: data,
  })
}
