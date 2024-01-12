import { api } from "@/services/api"

export interface SignInRequest {
  email: string
}

export async function signIn({ email }: SignInRequest) {
  await api.post('/authenticate', { email })
}