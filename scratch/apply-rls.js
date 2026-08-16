const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to PostgreSQL Supabase DB for RLS application!');

  const sql = `
    -- Helper function to check if current JWT user is admin
    CREATE OR REPLACE FUNCTION public.is_admin()
    RETURNS BOOLEAN AS $$
    BEGIN
      RETURN (
        (auth.jwt() ->> 'email') IN ('phatwibuu@gmail.com', 'admin@mos1000.vn') OR
        (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
        EXISTS (
          SELECT 1 FROM public.profiles 
          WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
      );
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- 1. CATEGORIES TABLE
    ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public select categories" ON public.categories;
    DROP POLICY IF EXISTS "Admin write categories" ON public.categories;

    CREATE POLICY "Public select categories" ON public.categories 
      FOR SELECT USING (true);

    CREATE POLICY "Admin write categories" ON public.categories 
      FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

    -- 2. COURSES TABLE
    ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public select courses" ON public.courses;
    DROP POLICY IF EXISTS "Admin write courses" ON public.courses;

    CREATE POLICY "Public select courses" ON public.courses 
      FOR SELECT USING (true);

    CREATE POLICY "Admin write courses" ON public.courses 
      FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

    -- 3. ORDERS TABLE
    ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow create order" ON public.orders;
    DROP POLICY IF EXISTS "Allow select own or admin orders" ON public.orders;
    DROP POLICY IF EXISTS "Admin update delete orders" ON public.orders;

    CREATE POLICY "Allow create order" ON public.orders 
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Allow select own or admin orders" ON public.orders 
      FOR SELECT USING (
        (auth.jwt() ->> 'email') = customer_email OR 
        public.is_admin()
      );

    CREATE POLICY "Admin update delete orders" ON public.orders 
      FOR UPDATE USING (public.is_admin());

    -- 4. ORDER_ITEMS TABLE
    ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow create order_items" ON public.order_items;
    DROP POLICY IF EXISTS "Allow select own or admin order_items" ON public.order_items;

    CREATE POLICY "Allow create order_items" ON public.order_items 
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Allow select own or admin order_items" ON public.order_items 
      FOR SELECT USING (
        public.is_admin() OR
        EXISTS (
          SELECT 1 FROM public.orders 
          WHERE orders.id = order_items.order_id 
          AND (auth.jwt() ->> 'email') = orders.customer_email
        )
      );

    -- 5. PROFILES TABLE
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users read own or admin profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users write own profile" ON public.profiles;

    CREATE POLICY "Users read own or admin profile" ON public.profiles 
      FOR SELECT USING (auth.uid() = id OR public.is_admin());

    CREATE POLICY "Users write own profile" ON public.profiles 
      FOR ALL USING (auth.uid() = id OR public.is_admin());

    -- 6. CONTACT_MESSAGES TABLE
    ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public create contact_messages" ON public.contact_messages;
    DROP POLICY IF EXISTS "Admin select manage contact_messages" ON public.contact_messages;

    CREATE POLICY "Allow public create contact_messages" ON public.contact_messages 
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Admin select manage contact_messages" ON public.contact_messages 
      FOR ALL USING (public.is_admin());

    -- 7. QUIZ_RESULTS TABLE
    ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public create quiz_results" ON public.quiz_results;
    DROP POLICY IF EXISTS "Allow public select quiz_results" ON public.quiz_results;
    DROP POLICY IF EXISTS "Admin manage quiz_results" ON public.quiz_results;

    CREATE POLICY "Allow public create quiz_results" ON public.quiz_results 
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Allow public select quiz_results" ON public.quiz_results 
      FOR SELECT USING (true);

    CREATE POLICY "Admin manage quiz_results" ON public.quiz_results 
      FOR ALL USING (public.is_admin());
  `;

  try {
    await client.query(sql);
    console.log('Successfully enabled RLS & configured policies on all tables!');
  } catch (err) {
    console.error('Error applying RLS policies:', err.message);
  } finally {
    await client.end();
  }
}

main();
