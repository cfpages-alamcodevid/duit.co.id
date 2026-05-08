import { getOrigin, getProduct, json, md5, requireDuitkuEnv } from "../../_duitku.js"

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}))
  const product = getProduct(body.productId)

  if (!product) {
    return json({ message: "Kelas tidak ditemukan." }, { status: 404 })
  }

  if (!body.paymentMethod) {
    return json({ message: "Pilih metode pembayaran terlebih dahulu." }, { status: 400 })
  }

  const customer = body.customer || {}
  if (!customer.name || !customer.email || !customer.phone) {
    return json({ message: "Lengkapi nama, email, dan nomor WhatsApp." }, { status: 400 })
  }

  const envCheck = requireDuitkuEnv(env)
  if (!envCheck.ok) return envCheck.response

  const { merchantCode, apiKey, baseUrl } = envCheck.config
  const origin = getOrigin(request)
  const merchantOrderId = `DUIT-${Date.now()}`
  const signature = md5(`${merchantCode}${merchantOrderId}${product.price}${apiKey}`)
  const [firstName, ...lastNameParts] = String(customer.name).trim().split(" ")
  const lastName = lastNameParts.join(" ") || "-"
  const address = {
    firstName,
    lastName,
    address: "Jakarta",
    city: "Jakarta",
    postalCode: "12950",
    phone: customer.phone,
    countryCode: "ID",
  }

  const payload = {
    merchantCode,
    paymentAmount: product.price,
    paymentMethod: body.paymentMethod,
    merchantOrderId,
    productDetails: product.name,
    additionalParam: `productId=${product.id}`,
    merchantUserInfo: customer.email,
    customerVaName: customer.name,
    email: customer.email,
    phoneNumber: customer.phone,
    itemDetails: [{ name: product.name, price: product.price, quantity: 1 }],
    customerDetail: {
      firstName,
      lastName,
      email: customer.email,
      phoneNumber: customer.phone,
      billingAddress: address,
      shippingAddress: address,
    },
    callbackUrl: `${origin}/api/duitku/callback`,
    returnUrl: `${origin}/checkout/return?orderId=${merchantOrderId}`,
    signature,
  }

  const duitkuResponse = await fetch(`${baseUrl}/v2/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await duitkuResponse.json().catch(() => ({}))

  if (!duitkuResponse.ok) {
    return json(
      { message: data.Message || data.message || "Pembayaran belum bisa dibuat.", raw: data },
      { status: duitkuResponse.status },
    )
  }

  return json({
    merchantOrderId,
    reference: data.reference || data.Reference,
    paymentUrl: data.paymentUrl || data.paymentURL || data.PaymentUrl,
    paymentCode: data.paymentCode || data.PaymentCode,
    vaNumber: data.vaNumber || data.VANumber,
    qrString: data.qrString || data.QrString,
    amount: data.amount || product.price,
    message: data.message || data.Message,
    raw: data,
  })
}
