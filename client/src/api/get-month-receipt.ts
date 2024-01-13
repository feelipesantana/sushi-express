import { api } from "@/services/api"

export interface GetMonthReceiptResponse {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthReceipt() {
  const response = await api.get<GetMonthReceiptResponse>(
    '/metrics/month-receipt',
  )

  return  response.data
   
}