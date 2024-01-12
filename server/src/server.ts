import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { authenticate } from "./http/authenticate";
import { authenticateFromLink } from "./http/routes/authenticate-from-link";
import { getProfile } from "./http/routes/get-profile";
import { registerCustomer } from "./http/routes/register-customer";
import { registerRestaurant } from "./http/routes/register-restaurant";
import { sendAuthenticationLink } from "./http/routes/send-authentication-link";

const app = new Elysia()
	.use(
		cors({
			credentials: true,
			allowedHeaders: ["content-type"],
			methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
			origin: (request): boolean => {
				const origin = request.headers.get("origin");

				if (!origin) {
					return false;
				}

				return true;
			},
		}),
	)
	.use(authenticate)
	.use(registerRestaurant)
	.use(sendAuthenticationLink)
	.use(authenticateFromLink)
	.use(registerCustomer)
	.use(getProfile);
app.listen(3333);
console.log(
	`🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
);
