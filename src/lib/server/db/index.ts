import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

// // Seed.
export async function seed() {
  const data = [
    { name: 'Pen', price: 800 },
    { name: 'Notebook', price: 350 },
    { name: 'Notepad', price: 300 },
    { name: 'Eraser', price: 280 },
    { name: 'Pencil', price: 180 },
    { name: 'Pencil sharpener', price: 750 },
    { name: 'Tape', price: 480 },
    { name: 'Stapler', price: 900 },
    { name: 'Glue stick', price: 620 }
  ];

  data.forEach(async (v) => {
    const pd: typeof schema.product.$inferInsert = v;
    await db.insert(schema.product).values(pd);
  });
}
