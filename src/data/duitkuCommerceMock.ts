export type DuitkuMockProductKind = "course" | "template" | "consultation"

export interface DuitkuMockProduct {
  id: string
  name: string
  kind: DuitkuMockProductKind
  shortDescription: string
  description: string
  price: number
  currency: "IDR"
  displayPrice: string
  provider: string
  taxable: boolean
  accessType: "instant_digital" | "scheduled_session"
  checkoutPath: string
}

export interface DuitkuMockSupportContact {
  email: string
  phone: string
  whatsapp: string
  address: string
  city: string
  postalCode: string
  countryCode: "ID"
  businessHours: string
}

export interface DuitkuMockTestingAccount {
  loginUrl: string
  email: string
  password: string
  role: "customer"
  note: string
}

export interface DuitkuMockCustomer {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface DuitkuMockCheckoutPayload {
  paymentAmount: number
  merchantOrderId: string
  productDetails: string
  additionalParam: string
  merchantUserInfo: string
  paymentMethod: string
  customerVaName: string
  email: string
  phoneNumber: string
  itemDetails: Array<{
    name: string
    price: number
    quantity: number
  }>
  customerDetail: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    billingAddress: DuitkuMockAddress
    shippingAddress: DuitkuMockAddress
  }
  callbackUrl: string
  returnUrl: string
  expiryPeriod: number
}

export interface DuitkuMockV2PaymentMethodsPayload {
  merchantCode: string
  paymentAmount: number
  datetime: string
  signature: string
}

export interface DuitkuMockV2TransactionPayload {
  merchantCode: string
  paymentAmount: number
  paymentMethod: string
  merchantOrderId: string
  productDetails: string
  additionalParam: string
  merchantUserInfo: string
  customerVaName: string
  email: string
  phoneNumber: string
  itemDetails: Array<{
    name: string
    price: number
    quantity: number
  }>
  customerDetail: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    billingAddress: DuitkuMockAddress
    shippingAddress: DuitkuMockAddress
  }
  callbackUrl: string
  returnUrl: string
  signature: string
}

interface DuitkuMockAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  phone: string
  countryCode: "ID"
}

export const duitkuMockSupportContact: DuitkuMockSupportContact = {
  email: "support@duit.co.id",
  phone: "+62 812-0000-3488",
  whatsapp: "+62 812-0000-3488",
  address: "Jl. Contoh Bisnis No. 1, Kuningan, Jakarta Selatan",
  city: "Jakarta Selatan",
  postalCode: "12950",
  countryCode: "ID",
  businessHours: "Senin-Jumat, 09:00-17:00 WIB",
}

export const duitkuMockTestingAccount: DuitkuMockTestingAccount = {
  loginUrl: "https://duit.co.id/login",
  email: "tester@duit.co.id",
  password: "DuitkuSandbox2026!",
  role: "customer",
  note: "Mock account for Duitku onboarding. Create this account in Clerk before sending credentials to Duitku.",
}

export const duitkuMockProducts: DuitkuMockProduct[] = [
  {
    id: "kelas-excel-cashflow-umkm",
    name: "Kelas Excel Cashflow UMKM",
    kind: "course",
    shortDescription: "Kursus praktis membuat arus kas 12 bulan untuk pemilik UMKM.",
    description:
      "Materi video dan template spreadsheet untuk memetakan pemasukan, biaya tetap, biaya variabel, dan skenario kas UMKM selama 12 bulan.",
    price: 199000,
    currency: "IDR",
    displayPrice: "Rp 199.000",
    provider: "Partner Ahli Duit.co.id",
    taxable: false,
    accessType: "instant_digital",
    checkoutPath: "/checkout/kelas-excel-cashflow-umkm",
  },
  {
    id: "template-sop-bisnis",
    name: "Paket Template SOP Bisnis",
    kind: "template",
    shortDescription: "Template SOP operasional, keuangan, dan customer service.",
    description:
      "Paket dokumen digital untuk membantu pemilik bisnis kecil membuat SOP pembukaan toko, kas harian, inventori, komplain pelanggan, dan laporan mingguan.",
    price: 99000,
    currency: "IDR",
    displayPrice: "Rp 99.000",
    provider: "Duit.co.id Marketplace",
    taxable: false,
    accessType: "instant_digital",
    checkoutPath: "/checkout/template-sop-bisnis",
  },
  {
    id: "sesi-konsultasi-partner-ahli",
    name: "Sesi Konsultasi Partner Ahli",
    kind: "consultation",
    shortDescription: "Sesi konsultasi 45 menit dengan partner ahli terverifikasi.",
    description:
      "Sesi konsultasi online untuk membahas masalah bisnis, pajak dasar, legal awal, atau perencanaan keuangan sesuai kebutuhan pengguna.",
    price: 150000,
    currency: "IDR",
    displayPrice: "Rp 150.000",
    provider: "Partner Ahli Duit.co.id",
    taxable: false,
    accessType: "scheduled_session",
    checkoutPath: "/checkout/sesi-konsultasi-partner-ahli",
  },
]

export const duitkuMockCustomer: DuitkuMockCustomer = {
  firstName: "Duitku",
  lastName: "Tester",
  email: "tester@duit.co.id",
  phoneNumber: "081200003488",
}

export function getDuitkuMockProduct(productId: string) {
  return duitkuMockProducts.find((product) => product.id === productId)
}

export function createDuitkuMockCheckoutPayload(
  productId: string,
  orderId = "DUIT-20260508-0001",
): DuitkuMockCheckoutPayload {
  const product = getDuitkuMockProduct(productId)

  if (!product) {
    throw new Error(`Unknown Duitku mock product: ${productId}`)
  }

  const address: DuitkuMockAddress = {
    firstName: duitkuMockCustomer.firstName,
    lastName: duitkuMockCustomer.lastName,
    address: duitkuMockSupportContact.address,
    city: duitkuMockSupportContact.city,
    postalCode: duitkuMockSupportContact.postalCode,
    phone: duitkuMockCustomer.phoneNumber,
    countryCode: duitkuMockSupportContact.countryCode,
  }

  return {
    paymentAmount: product.price,
    merchantOrderId: orderId,
    productDetails: product.name,
    additionalParam: `productId=${product.id}`,
    merchantUserInfo: duitkuMockCustomer.email,
    paymentMethod: "",
    customerVaName: `${duitkuMockCustomer.firstName} ${duitkuMockCustomer.lastName}`,
    email: duitkuMockCustomer.email,
    phoneNumber: duitkuMockCustomer.phoneNumber,
    itemDetails: [
      {
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ],
    customerDetail: {
      firstName: duitkuMockCustomer.firstName,
      lastName: duitkuMockCustomer.lastName,
      email: duitkuMockCustomer.email,
      phoneNumber: duitkuMockCustomer.phoneNumber,
      billingAddress: address,
      shippingAddress: address,
    },
    callbackUrl: "https://duit.co.id/api/duitku/callback",
    returnUrl: "https://duit.co.id/checkout/return",
    expiryPeriod: 60,
  }
}

export function createDuitkuMockV2PaymentMethodsPayload(
  productId: string,
  datetime = "2026-05-08 03:43:00",
): DuitkuMockV2PaymentMethodsPayload {
  const product = getDuitkuMockProduct(productId)

  if (!product) {
    throw new Error(`Unknown Duitku mock product: ${productId}`)
  }

  return {
    merchantCode: "DXXXX",
    paymentAmount: product.price,
    datetime,
    signature: "SERVER_GENERATED_SHA256",
  }
}

export function createDuitkuMockV2TransactionPayload(
  productId: string,
  paymentMethod = "VC",
  orderId = "DUIT-20260508-0001",
): DuitkuMockV2TransactionPayload {
  const product = getDuitkuMockProduct(productId)

  if (!product) {
    throw new Error(`Unknown Duitku mock product: ${productId}`)
  }

  const address: DuitkuMockAddress = {
    firstName: duitkuMockCustomer.firstName,
    lastName: duitkuMockCustomer.lastName,
    address: duitkuMockSupportContact.address,
    city: duitkuMockSupportContact.city,
    postalCode: duitkuMockSupportContact.postalCode,
    phone: duitkuMockCustomer.phoneNumber,
    countryCode: duitkuMockSupportContact.countryCode,
  }

  return {
    merchantCode: "DXXXX",
    paymentAmount: product.price,
    paymentMethod,
    merchantOrderId: orderId,
    productDetails: product.name,
    additionalParam: `productId=${product.id}`,
    merchantUserInfo: duitkuMockCustomer.email,
    customerVaName: `${duitkuMockCustomer.firstName} ${duitkuMockCustomer.lastName}`,
    email: duitkuMockCustomer.email,
    phoneNumber: duitkuMockCustomer.phoneNumber,
    itemDetails: [
      {
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ],
    customerDetail: {
      firstName: duitkuMockCustomer.firstName,
      lastName: duitkuMockCustomer.lastName,
      email: duitkuMockCustomer.email,
      phoneNumber: duitkuMockCustomer.phoneNumber,
      billingAddress: address,
      shippingAddress: address,
    },
    callbackUrl: "https://duit.co.id/api/duitku/callback",
    returnUrl: "https://duit.co.id/checkout/return",
    signature: "SERVER_GENERATED_MD5",
  }
}
