const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to PostgreSQL Supabase DB to check orders schema & data!');

  // Check columns of public.orders
  const columnsRes = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'orders';
  `);
  console.log('--- COLUMNS IN PUBLIC.ORDERS ---');
  console.log(columnsRes.rows);

  // Check columns of public.order_items
  const itemsColRes = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'order_items';
  `);
  console.log('--- COLUMNS IN PUBLIC.ORDER_ITEMS ---');
  console.log(itemsColRes.rows);

  // Query recent orders
  const ordersRes = await client.query(`
    SELECT * FROM public.orders ORDER BY created_at DESC LIMIT 5;
  `);
  console.log('--- RECENT ORDERS IN ORDERS TABLE ---');
  console.log(ordersRes.rows);

  // Query recent order_items
  const orderItemsRes = await client.query(`
    SELECT * FROM public.order_items ORDER BY created_at DESC LIMIT 5;
  `);
  console.log('--- RECENT ORDER_ITEMS IN ORDER_ITEMS TABLE ---');
  console.log(orderItemsRes.rows);

  await client.end();
}

main();
