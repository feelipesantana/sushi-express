import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { orderItems, orders } from "../../db/schemas";
import { authenticate } from "../authenticate";

export const createOrder = new Elysia().use(authenticate).post(
	"/restaurants/:restaurantId/orders",
	async ({ params, body, getCurrentUser, set }) => {
		const { sub: customerId } = await getCurrentUser();
		const { restaurantId } = params;
		const { items } = body;

		const productsIds = items.map((res) => res.productId);

		const products = await db.query.products.findMany({
			where(fields, { eq, and, inArray }) {
				return and(
					eq(fields.restaurantsId, restaurantId),
					inArray(fields.id, productsIds),
				);
			},
		});

		const orderProducts = items.map((item) => {
			const product = products.find((product) => product.id === item.productId);

			if (!product) {
				throw new Error("Not all products are available in this restaurant");
			}

			return {
				productId: item.productId,
				unitPriceInCents: product.priceInCents,
				quantity: item.quantity,
				subtotalInCents: product.priceInCents * item.quantity,
			};
		});

		const totalInCents = orderProducts.reduce((total, orderItem) => {
			console.log(total);
			console.log(orderItem.subtotalInCents);
			return total + orderItem.subtotalInCents;
		}, 0);

		await db.transaction(async (tx) => {
			const [order] = await tx
				.insert(orders)
				.values({
					totalInCents,
					customerId,
					restaurantId,
				})
				.returning({
					id: orders.id,
				});

			await tx.insert(orderItems).values(
				orderProducts.map((orderProduct) => {
					return {
						orderId: order.id,
						productId: orderProduct.productId,
						priceInCents: orderProduct.unitPriceInCents,
						quantity: orderProduct.quantity,
					};
				}),
			);
		});

		set.status = 201;
	},
	{
		body: t.Object({
			items: t.Array(
				t.Object({
					productId: t.String(),
					quantity: t.Number(),
				}),
			),
		}),
		params: t.Object({
			restaurantId: t.String(),
		}),
	},
);
