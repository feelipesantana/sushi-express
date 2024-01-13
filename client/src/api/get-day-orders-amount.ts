import { api } from "@/services/api"

export interface GetDayOrdersAmountResponse {
    amount: number
    diffFromYesterday: number
  }
export async function getDayOrdersAmount(){
    const response = await api.get<GetDayOrdersAmountResponse>('/metrics/day-orders-amount')
    if (response) return response.data
}