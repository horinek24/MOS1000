const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log('🔍 Testing Supabase SDK query...');
  const { data: categories, error: catErr } = await supabase.from('categories').select('*');
  if (catErr) console.error('Error fetching categories:', catErr);

  const { data: courses, error: courseErr } = await supabase.from('courses').select('*');
  if (courseErr) console.error('Error fetching courses:', courseErr);

  console.log(`✅ Categories returned by Supabase SDK: ${categories ? categories.length : 0}`);
  console.log(`✅ Courses returned by Supabase SDK: ${courses ? courses.length : 0}`);

  if (courses && courses.length > 0) {
    console.log('\n📌 Sample course from Supabase:');
    console.log(` - ID: ${courses[0].id}`);
    console.log(` - Title: ${courses[0].title}`);
    console.log(` - Price: ${courses[0].price} VND`);
    console.log(` - Level: ${courses[0].level}`);
    console.log(` - Category: ${courses[0].category_label}`);
  }
}

verify();
