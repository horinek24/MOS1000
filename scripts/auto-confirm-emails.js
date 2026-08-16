const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

async function autoConfirmEmails() {
  console.log('🔌 Connecting to Supabase PostgreSQL database...');
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!');

    // 1. Confirm all existing unconfirmed users (including phatwibuu@gmail.com)
    console.log('✉️ Confirming all existing unconfirmed email addresses...');
    const updateRes = await client.query(`
      UPDATE auth.users
      SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
      WHERE email_confirmed_at IS NULL;
    `);
    console.log(`✅ Confirmed ${updateRes.rowCount || 0} existing users!`);

    // 2. Create BEFORE INSERT trigger to auto-confirm all future signups
    console.log('⚡ Creating auto-confirm trigger for future signups...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.auto_confirm_user_email()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.email_confirmed_at IS NULL THEN
          NEW.email_confirmed_at := NOW();
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS on_auth_user_before_insert_confirm ON auth.users;
      CREATE TRIGGER on_auth_user_before_insert_confirm
        BEFORE INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_user_email();
    `);

    console.log('✅ Auto-confirm trigger active for all future signups!');

    // 3. Verify confirmation status of phatwibuu@gmail.com and all users
    const { rows } = await client.query(`
      SELECT id, email, email_confirmed_at, raw_user_meta_data->>'role' as role
      FROM auth.users;
    `);

    console.log('\n📌 Current Users Auth & Confirmation Status:');
    rows.forEach((user) => {
      console.log(` - Email: ${user.email} | Confirmed: ${user.email_confirmed_at ? 'YES ✅' : 'NO ❌'} | Role: ${user.role || 'student'}`);
    });

  } catch (err) {
    console.error('❌ Error setting up auto confirm emails:', err);
  } finally {
    await client.end();
  }
}

autoConfirmEmails();
