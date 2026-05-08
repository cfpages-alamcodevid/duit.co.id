import { json } from "./_duitku.js"

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=")
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function parseJwt(token) {
  const [header, payload, signature] = token.split(".")
  if (!header || !payload || !signature) {
    throw new Error("Invalid token")
  }

  return {
    header: JSON.parse(base64UrlDecode(header)),
    payload: JSON.parse(base64UrlDecode(payload)),
    signedData: `${header}.${payload}`,
    signature,
  }
}

function base64UrlToBytes(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=")
  const binary = atob(padded)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

async function verifyJwt(token, jwksUrl) {
  const parsed = parseJwt(token)
  const jwksResponse = await fetch(jwksUrl)

  if (!jwksResponse.ok) {
    throw new Error("Unable to fetch JWKS")
  }

  const jwks = await jwksResponse.json()
  const key = jwks.keys?.find((item) => item.kid === parsed.header.kid)

  if (!key) {
    throw new Error("Unknown signing key")
  }

  const cryptoKey = await crypto.subtle.importKey(
    "jwk",
    key,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  )
  const verified = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    base64UrlToBytes(parsed.signature),
    new TextEncoder().encode(parsed.signedData),
  )

  if (!verified) {
    throw new Error("Invalid token signature")
  }

  const now = Math.floor(Date.now() / 1000)
  if (parsed.payload.exp && parsed.payload.exp < now) {
    throw new Error("Expired token")
  }
  if (parsed.payload.nbf && parsed.payload.nbf > now) {
    throw new Error("Token not active")
  }
  if (!parsed.payload.sub) {
    throw new Error("Missing user id")
  }

  return parsed.payload
}

export async function requireUser(request, env) {
  const authHeader = request.headers.get("Authorization") || ""
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""

  if (!token) {
    return {
      ok: false,
      response: json({ message: "Silakan login terlebih dahulu." }, { status: 401 }),
    }
  }

  if (!env.CLERK_JWKS_URL) {
    return {
      ok: false,
      response: json(
        { message: "Profil belum tersedia. Konfigurasi login belum lengkap." },
        { status: 503 },
      ),
    }
  }

  try {
    const claims = await verifyJwt(token, env.CLERK_JWKS_URL)
    return { ok: true, userId: claims.sub, claims }
  } catch {
    return {
      ok: false,
      response: json({ message: "Sesi login tidak valid. Silakan login ulang." }, { status: 401 }),
    }
  }
}
