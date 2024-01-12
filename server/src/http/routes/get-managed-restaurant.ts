import Elysia from "elysia";
import { db } from "../../db/connection";
import { authenticate } from "../authenticate";

export const getManagedRestaurant = new Elysia()
	.use(authenticate)
	.get("/managed-restaurant", async ({ getManagedRestaurantId }) => {
		const restaurantId = await getManagedRestaurantId();

		const restaurant = await db.query.restaurants.findFirst({
			where(fields, { eq }) {
				return eq(fields.id, restaurantId);
			},
		});

		if (!restaurant) {
			throw new Error("Restaurant not found");
		}

		return restaurant;
	});
