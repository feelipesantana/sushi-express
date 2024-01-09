import { z } from "zod";


const envSchemaZod = z.object({
  URL_DB: z.string().url(),
  JWT_SECRET: z.string()
})

export const env = envSchemaZod.parse(process.env)