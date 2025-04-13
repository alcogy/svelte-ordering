import { db } from '$lib/server/db/index';
import type { PageServerLoad } from './$types';
import { sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
  const data = await db.execute(sql`
    SELECT
      od.*,
      ptc.amount
    FROM
      "order" od
    INNER JOIN (
      SELECT
        SUM(pt.quantity * pd.price) AS amount,
        pt.order_id
      FROM
        "particular" pt
      INNER JOIN
        "product" pd ON pd.id = pt.product_id
      GROUP BY
        pt.order_id
    ) ptc ON ptc.order_id = od.id;
  `);

  return {
    histories: data,
  };
};
