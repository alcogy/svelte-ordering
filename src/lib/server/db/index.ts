import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

// Seed.
export async function main() {
  const data = [
    { name: 'Pen', price: 800, manufacturer: 'Mitsu' },
    { name: 'Notebook', price: 350, manufacturer: 'Koku'  },
    { name: 'Notepad', price: 300, manufacturer: 'Koku'  },
    { name: 'Eraser', price: 280, manufacturer: 'Moon'  },
    { name: 'Pencil', price: 180, manufacturer: 'Mitsu'  },
    { name: 'Pencil sharpener', price: 750, manufacturer: 'Stead' },
    { name: 'Tape', price: 480, manufacturer: 'Koku'  },
    { name: 'Stapler', price: 900, manufacturer: 'Mitsu'  },
    { name: 'Glue stick', price: 620, manufacturer: 'Tom'  }
  ];

  data.forEach(async (v) => {
    const pd: typeof schema.product.$inferInsert = v;
    await db.insert(schema.product).values(pd);
  });
}

// You can use seed on access app.
// main();