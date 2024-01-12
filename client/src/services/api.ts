import { env } from "@/env";
import axios from "axios";
import {parseCookies} from 'nookies'

export const api = axios.create({
    baseURL: env.VITE_BASE_URL,
    withCredentials:true,
})  

api.interceptors.request.use((response) =>{

    const cookies = parseCookies()
    
    console.log("AQUI", cookies.auth)
    // api.defaults.headers.common["Authorization"] =  'Bearer '+
    return response
}, (error) => error)