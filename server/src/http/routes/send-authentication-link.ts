import { createId } from "@paralleldrive/cuid2";
import Elysia, { t } from "elysia";
import { set } from "zod";
import { db } from "../../db/connection";
import { authLinks } from "../../db/schemas/auth-links";
import { env } from "../../env";
import { resent } from "../../mail/client";
import { AuthenticationMagicLinkTemplate } from "../../mail/templates/authentication-magic-link";
import { UnauthorizedError } from "./errors/unauthorized-error";

export const sendAuthenticationLink = new Elysia().post(
	"/authenticate",
	async ({ body, set }) => {
		const { email } = body;

		const userFromEmail = await db.query.users.findFirst({
			where(fields, { eq }) {
				return eq(fields.email, email);
			},
		});

		if (!userFromEmail) {
			throw new UnauthorizedError();
		}

		const authLinkCode = createId();

		await db.insert(authLinks).values({
			userId: userFromEmail.id,
			code: authLinkCode,
		});

		const authLink = new URL("/auth-links/authenticate", env.API_BASE_URL);
		authLink.searchParams.set("code", authLinkCode);
		authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL);

		await resent.emails.send({
			from: "Pizza Shop <onboarding@resend.dev>",
			to: email,
			subject: "[Pizza shop] Link para login",
			react: AuthenticationMagicLinkTemplate({
				userEmail: email,
				authLink: authLink.toString(),
			}),
		});

		set.status = 200;
	},
	{
		body: t.Object({
			email: t.String({ format: "email" }),
		}),
	},
);
