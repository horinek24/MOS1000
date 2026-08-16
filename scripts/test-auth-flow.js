const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuthFlow() {
  console.log('🧪 Testing Supabase Auth Flow...');

  // 1. Try logging in with phatwibuu@gmail.com
  console.log('\n--- 1. Testing Login phatwibuu@gmail.com ---');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'phatwibuu@gmail.com',
    password: 'password123', // Let's check what password was set
  });

  if (signInError) {
    console.error('❌ Sign In Error for phatwibuu@gmail.com:', signInError.message, signInError.status);
  } else {
    console.log('✅ Sign In Success for phatwibuu@gmail.com!', signInData.user.email);
  }

  // 2. Check all users in auth.users via PG client
  const { Client } = require('pg');
  const pgClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await pgClient.connect();
  const { rows: users } = await pgClient.query(`
    SELECT id, email, email_confirmed_at, encrypted_password, raw_user_meta_data
    FROM auth.users;
  `);

  console.log('\n📌 Users in auth.users table:');
  users.forEach((u) => {
    console.log(` - ID: ${u.id} | Email: ${u.email} | Confirmed: ${u.email_confirmed_at} | Has Password Hash: ${Boolean(u.encrypted_password)}`);
  });

  await pgClient.end();
}

testAuthFlow();
