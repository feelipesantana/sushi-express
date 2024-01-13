import Elysia from "elysia";
import { authenticate } from "../authenticate";

export const signOut = new Elysia()
	.use(authenticate)
	.post("/sign-out", async ({ signOut }) => {
		signOut();
	});
