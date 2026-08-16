const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Adding status column to orders table if not exists...');

  await client.query(`
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status text DEFAULT 'Mới';
  `);

  console.log('Successfully added status column to orders table!');
  await client.end();
}

main();
