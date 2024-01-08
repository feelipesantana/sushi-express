import { z } from "zod";


const envSchemaZod = z.object({
  URL_DB: z.string().url(),

})

export const env = envSchemaZod.parse(process.env)