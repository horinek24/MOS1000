const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Testing quiz_results table check...');
  const { data, error } = await supabase.from('quiz_results').select('*').limit(1);
  if (error) {
    console.log('quiz_results table error or missing:', error.message);
  } else {
    console.log('quiz_results table is ready!');
  }
}

main();
