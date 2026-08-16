const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

async function setupProfilesAndPromoteAdmin() {
  console.log('🔌 Connecting to Supabase PostgreSQL database...');
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!');

    // 1. Create profiles table
    console.log('🛠 Creating public.profiles table and auto-trigger...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        full_name TEXT,
        role TEXT NOT NULL DEFAULT 'student',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

      -- Create function for auto profile creation on signup
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.profiles (id, email, full_name, role)
        VALUES (
          NEW.id,
          NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
          COALESCE(NEW.raw_user_meta_data->>'role', 'student')
        )
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          full_name = EXCLUDED.full_name,
          role = COALESCE(EXCLUDED.role, public.profiles.role);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Create trigger on auth.users
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `);

    console.log('✅ Profiles table and trigger created!');

    // 2. Sync existing auth users to profiles
    console.log('🔄 Syncing existing auth.users to profiles...');
    await client.query(`
      INSERT INTO public.profiles (id, email, full_name, role)
      SELECT 
        id, 
        email, 
        COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', email),
        CASE 
          WHEN email IN ('phatwibuu@gmail.com', 'admin@mos1000.vn') THEN 'admin'
          ELSE COALESCE(raw_user_meta_data->>'role', 'student')
        END
      FROM auth.users
      ON CONFLICT (id) DO UPDATE SET
        role = CASE 
          WHEN EXCLUDED.email IN ('phatwibuu@gmail.com', 'admin@mos1000.vn') THEN 'admin'
          ELSE public.profiles.role
        END;
    `);

    // 3. Promote phatwibuu@gmail.com to admin in raw_user_meta_data as well
    console.log('👑 Promoting phatwibuu@gmail.com to admin in auth.users user_metadata...');
    await client.query(`
      UPDATE auth.users
      SET raw_user_meta_data = 
        COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
      WHERE email IN ('phatwibuu@gmail.com', 'admin@mos1000.vn');

      UPDATE public.profiles
      SET role = 'admin'
      WHERE email IN ('phatwibuu@gmail.com', 'admin@mos1000.vn');
    `);

    console.log('✅ Successfully promoted phatwibuu@gmail.com and admin@mos1000.vn to ADMIN role!');

    // 4. Verify admin user role in database
    const { rows } = await client.query(`SELECT id, email, role FROM public.profiles WHERE email = 'phatwibuu@gmail.com';`);
    console.log('\n📌 Profile status for phatwibuu@gmail.com:');
    if (rows.length > 0) {
      console.log(` - Email: ${rows[0].email}`);
      console.log(` - Role:  ${rows[0].role}`);
    } else {
      console.log(' - User phatwibuu@gmail.com has not registered on Supabase Auth yet. Trigger & rule configured so when registered, will automatically be ADMIN!');
    }

  } catch (err) {
    console.error('❌ Error setting up profiles:', err);
  } finally {
    await client.end();
  }
}

setupProfilesAndPromoteAdmin();
