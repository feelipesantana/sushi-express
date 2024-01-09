import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { authenticate } from "./http/authenticate";
import { getProfile } from "./http/routes/get-profile";
import { registerCustomer } from "./http/routes/register-customer";

const app = new Elysia().use(
  cors({
    credentials: true,
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    origin: (request): boolean => {
      const origin = request.headers.get('origin')

      if (!origin) {
        return false
      }

      return true
    },
    
  })
)
.use(authenticate)
.use(registerCustomer)
.use(getProfile)
app.listen(3333)
console.log(`🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`)