import { api } from "@/services/api";

export async function SignOut(){
    const response = await api.post('/sign-out')

    if(response) return  response.data
}