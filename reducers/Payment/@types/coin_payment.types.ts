export interface ICoinPaymentResponse {
    amount: string
    txn_id: string
    address: string
    confirms_needed: string
    timeout: number
    checkout_url: string
    status_url: string
    qrcode_url: string
  }
  