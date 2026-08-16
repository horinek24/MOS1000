const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Fixing RLS policies for orders & order_items...');

  const sql = `
    -- 1. ORDERS TABLE RLS POLICIES
    ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow create order" ON public.orders;
    DROP POLICY IF EXISTS "Allow select own or admin orders" ON public.orders;
    DROP POLICY IF EXISTS "Admin update delete orders" ON public.orders;
    DROP POLICY IF EXISTS "Enable all operations for orders" ON public.orders;

    CREATE POLICY "Allow public insert orders" ON public.orders 
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Allow select orders" ON public.orders 
      FOR SELECT USING (true);

    CREATE POLICY "Admin update orders" ON public.orders 
      FOR UPDATE USING (public.is_admin());

    CREATE POLICY "Admin delete orders" ON public.orders 
      FOR DELETE USING (public.is_admin());

    -- 2. ORDER_ITEMS TABLE RLS POLICIES
    ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow create order_items" ON public.order_items;
    DROP POLICY IF EXISTS "Allow select own or admin order_items" ON public.order_items;
    DROP POLICY IF EXISTS "Enable all operations for order_items" ON public.order_items;

    CREATE POLICY "Allow public insert order_items" ON public.order_items 
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Allow select order_items" ON public.order_items 
      FOR SELECT USING (true);

    CREATE POLICY "Admin update order_items" ON public.order_items 
      FOR UPDATE USING (public.is_admin());

    CREATE POLICY "Admin delete order_items" ON public.order_items 
      FOR DELETE USING (public.is_admin());
  `;

  await client.query(sql);
  console.log('Successfully updated RLS policies for orders & order_items!');
  await client.end();
}

main();
