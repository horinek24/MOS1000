const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

async function setUserPasswords() {
  console.log('🔌 Connecting to Supabase PostgreSQL database...');
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!');

    // Hash password 'admin123'
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    console.log('🔑 Setting password "admin123" for phatwibuu@gmail.com and admin@mos1000.vn...');

    // 1. Ensure phatwibuu@gmail.com exists in auth.users
    const userCheck = await client.query(`SELECT id FROM auth.users WHERE email = 'phatwibuu@gmail.com';`);
    if (userCheck.rows.length === 0) {
      console.log('Creating phatwibuu@gmail.com in auth.users...');
      const userId = require('crypto').randomUUID();
      await client.query(`
        INSERT INTO auth.users (
          id, instance_id, email, encrypted_password, email_confirmed_at,
          raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
        )
        VALUES (
          $1, '00000000-0000-0000-0000-000000000000', 'phatwibuu@gmail.com', $2, NOW(),
          '{"provider":"email","providers":["email"]}', '{"full_name":"Phat Wibuu","role":"admin"}', NOW(), NOW(), 'authenticated', 'authenticated'
        );
      `, [userId, passwordHash]);
    } else {
      await client.query(`
        UPDATE auth.users
        SET encrypted_password = $1,
            email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
            raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
        WHERE email = 'phatwibuu@gmail.com';
      `, [passwordHash]);
    }

    // 2. Ensure admin@mos1000.vn exists in auth.users
    const adminCheck = await client.query(`SELECT id FROM auth.users WHERE email = 'admin@mos1000.vn';`);
    if (adminCheck.rows.length === 0) {
      console.log('Creating admin@mos1000.vn in auth.users...');
      const adminId = require('crypto').randomUUID();
      await client.query(`
        INSERT INTO auth.users (
          id, instance_id, email, encrypted_password, email_confirmed_at,
          raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
        )
        VALUES (
          $1, '00000000-0000-0000-0000-000000000000', 'admin@mos1000.vn', $2, NOW(),
          '{"provider":"email","providers":["email"]}', '{"full_name":"Quản Trị Viên (Admin)","role":"admin"}', NOW(), NOW(), 'authenticated', 'authenticated'
        );
      `, [adminId, passwordHash]);
    } else {
      await client.query(`
        UPDATE auth.users
        SET encrypted_password = $1,
            email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
            raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
        WHERE email = 'admin@mos1000.vn';
      `, [passwordHash]);
    }

    // 3. Sync to public.profiles
    await client.query(`
      INSERT INTO public.profiles (id, email, full_name, role)
      SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email), 'admin'
      FROM auth.users
      WHERE email IN ('phatwibuu@gmail.com', 'admin@mos1000.vn')
      ON CONFLICT (id) DO UPDATE SET role = 'admin';
    `);

    console.log('✅ Passwords and Admin roles updated successfully!');

    // 4. Test login with Supabase SDK
    const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
    const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

    console.log('\n🧪 Testing Supabase SDK login for phatwibuu@gmail.com / admin123...');
    const { data: loginRes, error: loginErr } = await supabase.auth.signInWithPassword({
      email: 'phatwibuu@gmail.com',
      password: 'admin123',
    });

    if (loginErr) {
      console.error('❌ Login Test Error:', loginErr.message);
    } else {
      console.log('🎉 LOGIN TEST SUCCESS! User logged in:', loginRes.user.email);
    }

  } catch (err) {
    console.error('❌ Error setting passwords:', err);
  } finally {
    await client.end();
  }
}

setUserPasswords();
