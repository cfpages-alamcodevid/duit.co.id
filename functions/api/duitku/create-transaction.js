import { getOrigin, getProduct, json, md5, requireDuitkuEnv } from "../../_duitku.js"
import { requireUser } from "../../_auth.js"
import { ensureD1User } from "../../_user.js"

function normalizeReturnPath(value, merchantOrderId) {
  const fallback = `/checkout/return?orderId=${encodeURIComponent(merchantOrderId)}`
  const raw = String(value || "").trim()

  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback

  const separator = raw.includes("?") ? "&" : "?"
  return `${raw}${separator}payment=processing&orderId=${encodeURIComponent(merchantOrderId)}`
}

function transactionFromOrder(order) {
  return {
    reused: true,
    merchantOrderId: order.merchant_order_id,
    reference: order.duitku_reference,
    paymentMethod: order.duitku_payment_method,
    paymentUrl: order.duitku_payment_url,
    paymentCode: order.duitku_payment_code,
    vaNumber: order.duitku_payment_code,
    amount: order.amount_idr,
    message: "Melanjutkan pembayaran yang belum selesai.",
  }
}

async function findPendingOrder(db, clerkUserId, courseSlug) {
  if (!db || !clerkUserId || !courseSlug) return null

  return db
    .prepare(
      `SELECT
        merchant_order_id,
        duitku_reference,
        duitku_payment_method,
        duitku_payment_code,
        duitku_payment_url,
        amount_idr
       FROM orders
       WHERE clerk_user_id = ?
         AND course_slug = ?
         AND product_type = 'course'
         AND status IN ('pending', 'callback_received')
       ORDER BY created_at DESC
       LIMIT 1`,
    )
    .bind(clerkUserId, courseSlug)
    .first()
}

export async function onRequestPost({ request, env }) {
  const auth = await requireUser(request, env)
  if (!auth.ok) return auth.response

  const clerkUserId = auth.userId
  if (env.DB) {
    await ensureD1User(env.DB, auth)
  }

  const body = await request.json().catch(() => ({}))
  const product = getProduct(body.productId)

  if (!product) {
    return json({ message: "Kelas tidak ditemukan." }, { status: 404 })
  }

  const pendingOrder = await findPendingOrder(env.DB, clerkUserId, product.id)
  if (pendingOrder) {
    return json(transactionFromOrder(pendingOrder))
  }

  if (!body.paymentMethod) {
    return json({ message: "Pilih metode pembayaran terlebih dahulu." }, { status: 400 })
  }

  const customer = body.customer || {}
  if (!customer.name || !customer.email) {
    return json({ message: "Login atau lengkapi akun peserta terlebih dahulu." }, { status: 400 })
  }
  const customerPhone = String(customer.phone || "").trim()

  const envCheck = requireDuitkuEnv(env)
  if (!envCheck.ok) return envCheck.response

  const { merchantCode, apiKey, baseUrl } = envCheck.config
  const origin = getOrigin(request)
  const merchantOrderId = `DUIT-${Date.now()}`
  const returnPath = normalizeReturnPath(body.returnPath, merchantOrderId)
  const signature = md5(`${merchantCode}${merchantOrderId}${product.price}${apiKey}`)
  const [firstName, ...lastNameParts] = String(customer.name).trim().split(" ")
  const lastName = lastNameParts.join(" ") || "-"
  const address = {
    firstName,
    lastName,
    address: "Jakarta",
    city: "Jakarta",
    postalCode: "12950",
    phone: customerPhone,
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
    phoneNumber: customerPhone,
    itemDetails: [{ name: product.name, price: product.price, quantity: 1 }],
    customerDetail: {
      firstName,
      lastName,
      email: customer.email,
      phoneNumber: customerPhone,
      billingAddress: address,
      shippingAddress: address,
    },
    callbackUrl: `${origin}/api/duitku/callback`,
    returnUrl: `${origin}${returnPath}`,
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

  if (env.DB) {
    await env.DB.prepare(
      `INSERT INTO orders (
        clerk_user_id, email, customer_name, phone_e164, product_id, product_name,
        product_type, course_slug, amount_idr, merchant_order_id, duitku_reference,
        duitku_payment_method, duitku_payment_code, duitku_payment_url, status,
        raw_create_response, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'course', ?, ?, ?, ?, ?, ?, ?, 'pending', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    )
      .bind(
        clerkUserId,
        customer.email,
        customer.name,
        customerPhone,
        product.id,
        product.name,
        product.id,
        product.price,
        merchantOrderId,
        data.reference || data.Reference || "",
        body.paymentMethod,
        data.paymentCode || data.PaymentCode || data.vaNumber || data.VANumber || "",
        data.paymentUrl || data.paymentURL || data.PaymentUrl || "",
        JSON.stringify(data),
      )
      .run()
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
