import { api } from "@/services/api"

export interface GetManagedRestaurantResponse {
    name: string
    id: string
    createdAt: Date | null
    updatedAt: Date | null
    description: string | null
    managerId: string | null
  }

export async function getManagedRestaurant(){
    const response = await api.get<GetManagedRestaurantResponse>("/managed-restaurant   ")

    if(response) return response.data
    
}