import type { Actions } from './$types';
import { db } from '$lib/server/db/index';
import * as schema from '$lib/server/db/schema';
import { type Cart } from '$lib/shared';

export const actions = {
  default: async ({ request }) => {
    const data = (await request.json()) as Cart[];
    await db.transaction(async () => {
      // Insert order data.
      const order = await db
        .insert(schema.order)
        .values({})
        .returning({ id: schema.order.id });
      const id = order[0].id;

      // Insert particular data.
      data.forEach(async (v, i) => {
        const pd: typeof schema.particular.$inferInsert = {
          orderId: id,
          productId: v.product.id,
          quantity: v.quantity,
          sort: i,
        };
        await db.insert(schema.particular).values(pd);
      });
    });

    return {
      result: 'ok',
    };
  },
} satisfies Actions;
