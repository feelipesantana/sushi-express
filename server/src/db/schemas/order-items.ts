import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";

export const orderItems = pgTable("order-items", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	orderId: text("order_id")
		.notNull()
		.references(() => orders.id, {
			onDelete: "cascade",
		}),
	productId: text("product_id")
		.notNull()
		.references(() => products.id, {
			onDelete: "cascade",
		}),
	quantity: integer("quantity").default(1),
	priceInCents: integer("price_in_cents").notNull(),
});
