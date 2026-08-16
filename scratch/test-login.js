const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin(email, password) {
  console.log(`Testing login for: ${email}`);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('❌ Login Error:', error.message);
  } else {
    console.log('✅ Login SUCCESS! User:', data.user.email);
  }
}

async function main() {
  // Test 1: exact registered email 'trinhtanphat240420@gmai.com'
  await testLogin('trinhtanphat240420@gmai.com', 'concac12m');

  // Test 2: 'trinhtanphat240420@gmail.com'
  await testLogin('trinhtanphat240420@gmail.com', 'concac12m');
}

main();
