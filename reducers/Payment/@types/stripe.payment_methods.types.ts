export interface IStripePaymentMethods {
    id: string
    object: string
    billing_details: BillingDetails
    card: Card
    created: number
    customer: string
    livemode: boolean
    metadata: Metadata
    type: string
}
export interface BillingDetails {
    address: Address
    email: any
    name: string
    phone: any
}
export interface Address {
    city: any
    country: any
    line1: any
    line2: any
    postal_code: any
    state: any
}
export interface Card {
    brand: string
    checks: Checks
    country: string
    exp_month: number
    exp_year: number
    fingerprint: string
    funding: string
    generated_from: any
    last4: string
    networks: Networks
    three_d_secure_usage: ThreeDSecureUsage
    wallet: any
}
export interface Checks {
    address_line1_check: any
    address_postal_code_check: any
    cvc_check: string
}
export interface Networks {
    available: string[]
    preferred: any
}
export interface ThreeDSecureUsage {
    supported: boolean
}

export interface Metadata { }