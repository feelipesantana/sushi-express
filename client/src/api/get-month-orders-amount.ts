import { api } from "@/services/api";

export async function getMonthOrdersAmount(){
    const response = await api.get('/metrics/month-orders-amount')

    if (response) return response.data
}