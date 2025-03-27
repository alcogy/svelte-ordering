import { db } from '$lib/server/db/index';
import type { PageServerLoad } from './$types';
import { order } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ params }) => {
  const data = await db.select().from(order).orderBy(order.id);
  return {
    histories: data,
  };
};
