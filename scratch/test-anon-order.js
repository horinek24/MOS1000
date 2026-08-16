const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Testing anon order insertion...');

  const orderPayload = {
    customer_name: 'Test Customer',
    customer_email: 'tanphattrinh938@gmail.com',
    customer_phone: '0912345678',
    customer_address: '123 Test Street',
    payment_method: 'qr',
    payment_status: 'pending',
    total_amount: 599000,
    notes: 'Test order',
    items: [
      {
        course_id: 'word-master',
        course_title: 'Khóa học Word Nâng Cao',
        price: 599000,
        quantity: 1,
      },
    ],
  };

  const { data: newOrder, error: orderErr } = await supabase
    .from('orders')
    .insert(orderPayload)
    .select()
    .single();

  if (orderErr) {
    console.error('❌ Orders Insert Error:', orderErr);
  } else {
    console.log('✅ Orders Insert SUCCESS:', newOrder);

    const { error: itemsErr } = await supabase.from('order_items').insert([
      {
        order_id: newOrder.id,
        course_id: 'word-master',
        course_title: 'Khóa học Word Nâng Cao',
        price: 599000,
        quantity: 1,
      },
    ]);

    if (itemsErr) {
      console.error('❌ Order Items Insert Error:', itemsErr);
    } else {
      console.log('✅ Order Items Insert SUCCESS!');
    }
  }
}

main();
