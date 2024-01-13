import { api } from "@/services/api";

export type GetPopularProductsResponse = Array<{
    product: string
    amount: number
}>

export async function getPopularProducts() {
    const response = await api.get('/metrics/popular-products')

    return response.data
}