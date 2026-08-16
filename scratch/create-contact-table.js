const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to PostgreSQL Supabase DB for contact_messages table!');

  const sql = `
    CREATE TABLE IF NOT EXISTS public.contact_messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Mới',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Allow public select contact_messages" ON public.contact_messages FOR SELECT USING (true);
    CREATE POLICY "Allow public insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
    CREATE POLICY "Allow public update contact_messages" ON public.contact_messages FOR UPDATE USING (true);
    CREATE POLICY "Allow public delete contact_messages" ON public.contact_messages FOR DELETE USING (true);
  `;

  try {
    await client.query(sql);
    console.log('Successfully created public.contact_messages table and RLS policies!');
  } catch (err) {
    console.error('Error creating contact_messages table:', err.message);
  } finally {
    await client.end();
  }
}

main();
