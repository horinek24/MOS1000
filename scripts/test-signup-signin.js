const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFullSignupSignin() {
  console.log('🧪 Testing Full Signup -> Logout -> Signin Cycle...');

  const testEmail = `user_${Date.now()}@gmail.com`;
  const testPassword = 'Password123!';

  console.log(`\n1. Signing up new user: ${testEmail}...`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        full_name: 'Test Student',
        role: 'student'
      }
    }
  });

  if (signUpError) {
    console.error('❌ Sign Up Error:', signUpError.message);
    return;
  }
  console.log('✅ Sign Up Success! User ID:', signUpData.user?.id);

  console.log('\n2. Signing out session...');
  await supabase.auth.signOut();
  console.log('✅ Signed out successfully!');

  console.log(`\n3. Signing back in with ${testEmail} and ${testPassword}...`);
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (signInError) {
    console.error('❌ Sign In Error after logout:', signInError.message);
  } else {
    console.log('✅ SIGN IN SUCCESS AFTER LOGOUT! User ID:', signInData.user?.id);
  }
}

testFullSignupSignin();
