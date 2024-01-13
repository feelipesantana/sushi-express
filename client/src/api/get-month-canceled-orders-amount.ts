import { api } from "@/services/api"

export interface GetMonthCanceledOrdersAmountResponse {
    amount: number
    diffFromLastMonth: number
  }
  
export async function getMonthCanceledOrdersAmount(){
    const response = await api.get<GetMonthCanceledOrdersAmountResponse>('/metrics/month-canceled-orders-amount')
    if (response) return response.data
}