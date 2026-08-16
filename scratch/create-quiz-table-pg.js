const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to PostgreSQL Supabase DB!');

  const sql = `
    CREATE TABLE IF NOT EXISTS public.quiz_results (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      user_email TEXT,
      user_name TEXT,
      quiz_id TEXT NOT NULL,
      quiz_title TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      time_spent INTEGER NOT NULL,
      passed BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Allow public select quiz_results" ON public.quiz_results FOR SELECT USING (true);
    CREATE POLICY "Allow public insert quiz_results" ON public.quiz_results FOR INSERT WITH CHECK (true);
  `;

  try {
    await client.query(sql);
    console.log('Successfully created public.quiz_results table and RLS policies!');
  } catch (err) {
    console.error('Error creating quiz_results:', err.message);
  } finally {
    await client.end();
  }
}

main();
