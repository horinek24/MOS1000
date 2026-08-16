const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Dropping strict FK constraint on order_items.course_id...');

  await client.query(`
    ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_course_id_fkey;
  `);

  console.log('Successfully dropped FK constraint on order_items.course_id!');
  await client.end();
}

main();
