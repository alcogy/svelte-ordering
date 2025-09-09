import { db } from '$lib/server/db/index';
import type { PageServerLoad } from './$types';
import { product } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ params }) => {
  const data = await db
    .select()
    .from(product)
    .orderBy(product.id);

  return {
    products: data
  };
};
