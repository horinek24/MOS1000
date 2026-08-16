const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:%3D%249M%40%26M9m9ekw.%2B@db.itecxxuvzfentryqllsz.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Fixing email typo in auth.users...');

  await client.query(`
    UPDATE auth.users 
    SET email = 'trinhtanphat240420@gmail.com',
        raw_user_meta_data = jsonb_set(raw_user_meta_data, '{email}', '"trinhtanphat240420@gmail.com"')
    WHERE email = 'trinhtanphat240420@gmai.com';
  `);

  await client.query(`
    UPDATE public.profiles 
    SET email = 'trinhtanphat240420@gmail.com'
    WHERE email = 'trinhtanphat240420@gmai.com';
  `);

  console.log('Successfully updated email to trinhtanphat240420@gmail.com!');
  await client.end();
}

main();
