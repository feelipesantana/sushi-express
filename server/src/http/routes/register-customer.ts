import Elysia from "elysia";
import { z } from "zod";
import { db } from "../../db/connection";
import { users } from "../../db/schemas";
import { RegisterError } from "./errors/register-error";

const registerCustomerBodySchema = z.object({
  name: z.string().min(1),
  phone: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4)
}).superRefine(({confirmPassword, password}, ctx) =>{
  if (password !== confirmPassword){
    ctx.addIssue({
      code: "custom",
      message: "Senha não são iguais"
    });
  }
})
export const registerCustomer = new Elysia().post('/customers', 
  async ({body, set})=>{


    const {name, email, phone} = registerCustomerBodySchema.parse(body)
    

    const create = await db.insert(users).values({
      name,
      email,
      phone,
    })

    if(!create){
      set.status = 400
      throw new RegisterError()
    }
    set.status = 201
  }
)