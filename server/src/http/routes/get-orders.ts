import Elysia from "elysia";
import { authenticate } from "../authenticate";
import { db } from "../../db/connection";
import { orders, users } from "../../db/schemas";
import { and, eq, ilike } from "drizzle-orm";

export const getOrders = new Elysia().use(authenticate).get('/orders', async ({query, getCurrentUser, set}) =>{
  const {pageIndex, orderId, customerName, status} = query
  const {restaurantId} = await getCurrentUser()

  if(!restaurantId){
    set.status = 401

    throw new Error("User is not a restaurant manager")
  }

  const baseQuery = db.select({
    orderId: orders.id,
    createdAt: orders.createdAt,
    status: orders.status,
    customerName: users.name,
    total: orders.totalInCents,
  }).from(orders).innerJoin(users, eq(users.id, orders.customerId))
  .where(
    and(
      eq(orders.restaurantId, restaurantId),
      orderId ? ilike(orders.id, `%${orderId}%`) : undefined,
      status ? eq(orders.status, status) : undefined,
      customerName ? ilike(users.name, `%${customerName}%`) : undefined
    ),

  )


})