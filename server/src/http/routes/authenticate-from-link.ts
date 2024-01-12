import dayjs from "dayjs";
import Elysia from "elysia";
import { db } from "../../db/connection";
import { authenticate } from "../authenticate";
import { UnauthorizedError } from "./errors/unauthorized-error";

export const authenticateFromLink = new Elysia()
	.use(authenticate)
	.get("/auth-links/authenticate", async ({ signUser, query, set }) => {
		const { code, redirect } = query;

		if (!code) {
			throw new UnauthorizedError();
		}
		const authLinkFromCode = await db.query.authLinks.findFirst({
			where(fields, { eq }) {
				return eq(fields.code, code);
			},
		});

		if (!authLinkFromCode) {
			throw new UnauthorizedError();
		}

		if (dayjs().diff(authLinkFromCode.createdAt, "days") > 2) {
			throw new UnauthorizedError();
		}

		const managedRestaurant = await db.query.restaurants.findFirst({
			where(fields, { eq }) {
				return eq(fields.managerId, authLinkFromCode.userId);
			},
		});

		await signUser({
			sub: authLinkFromCode.userId,
			restaurantId: managedRestaurant?.id,
		});

		set.redirect = redirect;
	});
