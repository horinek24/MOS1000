const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to PostgreSQL Supabase DB to check auth users!');

  const res = await client.query(`
    SELECT id, email, confirmed_at, email_confirmed_at, raw_user_meta_data, created_at
    FROM auth.users
    ORDER BY created_at DESC;
  `);

  console.log('--- RECENT USERS IN AUTH.USERS ---');
  console.log(res.rows);

  // Check auto confirm trigger definition
  const triggerRes = await client.query(`
    SELECT tgname, action_timing, event_manipulation 
    FROM information_schema.triggers 
    WHERE event_object_table = 'users';
  `);
  console.log('--- TRIGGERS ON AUTH.USERS ---');
  console.log(triggerRes.rows);

  await client.end();
}

main();
