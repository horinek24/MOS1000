const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Checking courses table IDs and foreign key constraints...');

  const coursesRes = await client.query(`
    SELECT id, title FROM public.courses;
  `);
  console.log('--- EXISTING COURSES IN DB ---');
  console.log(coursesRes.rows);

  const fkRes = await client.query(`
    SELECT conname, pg_get_constraintdef(c.oid)
    FROM pg_constraint c
    JOIN pg_namespace n ON n.oid = c.connamespace
    WHERE conrelid = 'public.order_items'::regclass;
  `);
  console.log('--- CONSTRAINTS ON ORDER_ITEMS ---');
  console.log(fkRes.rows);

  await client.end();
}

main();
