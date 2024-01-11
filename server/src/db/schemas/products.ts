import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { orderItems } from "./order-items";
import { restaurants } from "./restaurants";

export const products = pgTable("products", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text("name").notNull(),

	description: text("description"),
	priceInCents: integer("price_in_cents").notNull(),
	restaurantsId: text("restaurant_id")
		.references(() => restaurants.id, {
			onDelete: "cascade",
		})
		.notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
	restaurant: one(restaurants, {
		fields: [products.restaurantsId],
		references: [restaurants.id],
		relationName: "productRestaurant",
	}),
	orderItems: many(orderItems),
}));
