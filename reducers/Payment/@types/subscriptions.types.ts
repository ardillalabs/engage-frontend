export interface ISubscription {
  id: string
  payment_id: string
  amount: number
  payment_method: string
  payment_type: string
  expire_date: string
  create_date: Date
  status: string
  isRenewal: boolean
}