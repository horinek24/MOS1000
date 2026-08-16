const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createDefaultAdminUser() {
  console.log('🔑 Ensuring default Admin user admin@mos1000.vn exists on Supabase Auth...');
  
  // Try logging in as admin
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'admin@mos1000.vn',
    password: 'admin123',
  });

  if (signInData?.user) {
    console.log('✅ Admin user admin@mos1000.vn is ready and authenticated on Supabase Auth!');
    return;
  }

  // If not existing, sign up admin user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: 'admin@mos1000.vn',
    password: 'admin123',
    options: {
      data: {
        full_name: 'Quản Trị Viên (Admin)',
        role: 'admin',
      },
    },
  });

  if (signUpError) {
    console.log('Admin user sign up note:', signUpError.message);
  } else {
    console.log('✅ Created default Admin user admin@mos1000.vn on Supabase Auth!');
  }
}

createDefaultAdminUser();
