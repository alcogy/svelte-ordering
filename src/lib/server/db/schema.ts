import { sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull().default(''),
  manufacturer: varchar('manufacturer').notNull().default(''),
  price: integer('price').notNull().default(0),
});

export const order = pgTable('order', {
  id: serial('id').primaryKey(),
  orderedDate: timestamp('ordered_date')
    .notNull()
    .default(sql`now()`),
});

export const particular = pgTable('particular', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().default(0),
  productId: integer('product_id').notNull().default(0),
  quantity: integer('quantity').notNull().default(0),
  sort: integer('sort').notNull().default(0),
});
