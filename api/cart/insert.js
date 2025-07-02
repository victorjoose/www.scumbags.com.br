const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { item_id, size, quantity, user_email } = req.body;

  if (!item_id || !quantity) {
    return res.status(400).json({ error: 'Missing item_id or quantity' });
  }

  const { data, error } = await supabase
    .from('cart_items')
    .insert([{ item_id, size, quantity, user_email }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ message: 'Item added to cart', data });
};
