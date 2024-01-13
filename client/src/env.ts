import { z } from "zod";

const schemaEnvZod = z.object({
    VITE_BASE_URL:z.string().url(),
})

export const env = schemaEnvZod.parse(import.meta.env)