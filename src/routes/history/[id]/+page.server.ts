import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/index';
import type { PageServerLoad } from './$types';
import { particular, product } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ params }) => {
  const data = await db
    .select()
    .from(particular)
    .leftJoin(product, eq(particular.productId, product.id))
    .where(eq(particular.orderId, Number(params.id)))
    .orderBy(particular.sort);
    
  return {
    data: data,
  };
};
