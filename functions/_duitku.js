export const checkoutProducts = {
  "blueprint-bebas-utang": {
    id: "blueprint-bebas-utang",
    name: "Blueprint Bebas Utang",
    price: 399000,
  },
}

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  })
}

export function getDuitkuEnv(env) {
  return {
    merchantCode: env.DUITKU_MERCHANT_CODE,
    apiKey: env.DUITKU_API_KEY,
    baseUrl: env.DUITKU_V2_BASE_URL || "https://sandbox.duitku.com/webapi/api/merchant",
  }
}

export function requireDuitkuEnv(env) {
  const config = getDuitkuEnv(env)

  if (!config.merchantCode || !config.apiKey) {
    return {
      ok: false,
      response: json(
        {
          message:
            "Pembayaran belum tersedia. Silakan coba lagi setelah konfigurasi pembayaran aktif.",
        },
        { status: 503 },
      ),
    }
  }

  return { ok: true, config }
}

export function getProduct(productId) {
  return checkoutProducts[productId]
}

export function getOrigin(request) {
  const url = new URL(request.url)
  return `${url.protocol}//${url.host}`
}

export function duitkuDateTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .formatToParts(new Date())
    .reduce((carry, part) => {
      carry[part.type] = part.value
      return carry
    }, {})

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`
}

export async function sha256Hex(value) {
  const data = new TextEncoder().encode(value)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

export function md5(input) {
  const rotateLeft = (value, shift) => (value << shift) | (value >>> (32 - shift))
  const addUnsigned = (x, y) => {
    const x4 = x & 0x40000000
    const y4 = y & 0x40000000
    const x8 = x & 0x80000000
    const y8 = y & 0x80000000
    const result = (x & 0x3fffffff) + (y & 0x3fffffff)

    if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8
    if (x4 | y4) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x8 ^ y8
      return result ^ 0x40000000 ^ x8 ^ y8
    }

    return result ^ x8 ^ y8
  }
  const f = (x, y, z) => (x & y) | (~x & z)
  const g = (x, y, z) => (x & z) | (y & ~z)
  const h = (x, y, z) => x ^ y ^ z
  const i = (x, y, z) => y ^ (x | ~z)
  const transform = (fn, a, b, c, d, x, s, ac) => addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, fn(b, c, d)), addUnsigned(x, ac)), s), b)
  const utf8 = unescape(encodeURIComponent(input))
  const words = []
  let byteLength = utf8.length

  for (let index = 0; index < byteLength; index += 1) {
    words[index >> 2] = words[index >> 2] || 0
    words[index >> 2] |= utf8.charCodeAt(index) << ((index % 4) * 8)
  }

  words[byteLength >> 2] = words[byteLength >> 2] || 0
  words[byteLength >> 2] |= 0x80 << ((byteLength % 4) * 8)
  words[(((byteLength + 8) >> 6) + 1) * 16 - 2] = byteLength * 8

  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476

  for (let k = 0; k < words.length; k += 16) {
    const aa = a
    const bb = b
    const cc = c
    const dd = d

    a = transform(f, a, b, c, d, words[k + 0], 7, 0xd76aa478)
    d = transform(f, d, a, b, c, words[k + 1], 12, 0xe8c7b756)
    c = transform(f, c, d, a, b, words[k + 2], 17, 0x242070db)
    b = transform(f, b, c, d, a, words[k + 3], 22, 0xc1bdceee)
    a = transform(f, a, b, c, d, words[k + 4], 7, 0xf57c0faf)
    d = transform(f, d, a, b, c, words[k + 5], 12, 0x4787c62a)
    c = transform(f, c, d, a, b, words[k + 6], 17, 0xa8304613)
    b = transform(f, b, c, d, a, words[k + 7], 22, 0xfd469501)
    a = transform(f, a, b, c, d, words[k + 8], 7, 0x698098d8)
    d = transform(f, d, a, b, c, words[k + 9], 12, 0x8b44f7af)
    c = transform(f, c, d, a, b, words[k + 10], 17, 0xffff5bb1)
    b = transform(f, b, c, d, a, words[k + 11], 22, 0x895cd7be)
    a = transform(f, a, b, c, d, words[k + 12], 7, 0x6b901122)
    d = transform(f, d, a, b, c, words[k + 13], 12, 0xfd987193)
    c = transform(f, c, d, a, b, words[k + 14], 17, 0xa679438e)
    b = transform(f, b, c, d, a, words[k + 15], 22, 0x49b40821)

    a = transform(g, a, b, c, d, words[k + 1], 5, 0xf61e2562)
    d = transform(g, d, a, b, c, words[k + 6], 9, 0xc040b340)
    c = transform(g, c, d, a, b, words[k + 11], 14, 0x265e5a51)
    b = transform(g, b, c, d, a, words[k + 0], 20, 0xe9b6c7aa)
    a = transform(g, a, b, c, d, words[k + 5], 5, 0xd62f105d)
    d = transform(g, d, a, b, c, words[k + 10], 9, 0x02441453)
    c = transform(g, c, d, a, b, words[k + 15], 14, 0xd8a1e681)
    b = transform(g, b, c, d, a, words[k + 4], 20, 0xe7d3fbc8)
    a = transform(g, a, b, c, d, words[k + 9], 5, 0x21e1cde6)
    d = transform(g, d, a, b, c, words[k + 14], 9, 0xc33707d6)
    c = transform(g, c, d, a, b, words[k + 3], 14, 0xf4d50d87)
    b = transform(g, b, c, d, a, words[k + 8], 20, 0x455a14ed)
    a = transform(g, a, b, c, d, words[k + 13], 5, 0xa9e3e905)
    d = transform(g, d, a, b, c, words[k + 2], 9, 0xfcefa3f8)
    c = transform(g, c, d, a, b, words[k + 7], 14, 0x676f02d9)
    b = transform(g, b, c, d, a, words[k + 12], 20, 0x8d2a4c8a)

    a = transform(h, a, b, c, d, words[k + 5], 4, 0xfffa3942)
    d = transform(h, d, a, b, c, words[k + 8], 11, 0x8771f681)
    c = transform(h, c, d, a, b, words[k + 11], 16, 0x6d9d6122)
    b = transform(h, b, c, d, a, words[k + 14], 23, 0xfde5380c)
    a = transform(h, a, b, c, d, words[k + 1], 4, 0xa4beea44)
    d = transform(h, d, a, b, c, words[k + 4], 11, 0x4bdecfa9)
    c = transform(h, c, d, a, b, words[k + 7], 16, 0xf6bb4b60)
    b = transform(h, b, c, d, a, words[k + 10], 23, 0xbebfbc70)
    a = transform(h, a, b, c, d, words[k + 13], 4, 0x289b7ec6)
    d = transform(h, d, a, b, c, words[k + 0], 11, 0xeaa127fa)
    c = transform(h, c, d, a, b, words[k + 3], 16, 0xd4ef3085)
    b = transform(h, b, c, d, a, words[k + 6], 23, 0x04881d05)
    a = transform(h, a, b, c, d, words[k + 9], 4, 0xd9d4d039)
    d = transform(h, d, a, b, c, words[k + 12], 11, 0xe6db99e5)
    c = transform(h, c, d, a, b, words[k + 15], 16, 0x1fa27cf8)
    b = transform(h, b, c, d, a, words[k + 2], 23, 0xc4ac5665)

    a = transform(i, a, b, c, d, words[k + 0], 6, 0xf4292244)
    d = transform(i, d, a, b, c, words[k + 7], 10, 0x432aff97)
    c = transform(i, c, d, a, b, words[k + 14], 15, 0xab9423a7)
    b = transform(i, b, c, d, a, words[k + 5], 21, 0xfc93a039)
    a = transform(i, a, b, c, d, words[k + 12], 6, 0x655b59c3)
    d = transform(i, d, a, b, c, words[k + 3], 10, 0x8f0ccc92)
    c = transform(i, c, d, a, b, words[k + 10], 15, 0xffeff47d)
    b = transform(i, b, c, d, a, words[k + 1], 21, 0x85845dd1)
    a = transform(i, a, b, c, d, words[k + 8], 6, 0x6fa87e4f)
    d = transform(i, d, a, b, c, words[k + 15], 10, 0xfe2ce6e0)
    c = transform(i, c, d, a, b, words[k + 6], 15, 0xa3014314)
    b = transform(i, b, c, d, a, words[k + 13], 21, 0x4e0811a1)
    a = transform(i, a, b, c, d, words[k + 4], 6, 0xf7537e82)
    d = transform(i, d, a, b, c, words[k + 11], 10, 0xbd3af235)
    c = transform(i, c, d, a, b, words[k + 2], 15, 0x2ad7d2bb)
    b = transform(i, b, c, d, a, words[k + 9], 21, 0xeb86d391)

    a = addUnsigned(a, aa)
    b = addUnsigned(b, bb)
    c = addUnsigned(c, cc)
    d = addUnsigned(d, dd)
  }

  return [a, b, c, d]
    .map((value) =>
      Array.from({ length: 4 }, (_, index) =>
        ((value >>> (index * 8)) & 255).toString(16).padStart(2, "0"),
      ).join(""),
    )
    .join("")
}
