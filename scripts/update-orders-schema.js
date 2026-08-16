const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

async function updateSchema() {
  console.log('🔌 Connecting to Supabase PostgreSQL database...');
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!');

    console.log('🛠 Updating public.orders table schema...');
    await client.query(`
      ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_address TEXT;
      ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;
    `);

    console.log('✅ Schema updated successfully with customer_address and items columns!');
  } catch (err) {
    console.error('❌ Error updating schema:', err);
  } finally {
    await client.end();
  }
}

updateSchema();
