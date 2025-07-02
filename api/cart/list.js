const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('cart_items')
    .select('id, item_id, quantity, items(id, name, price_brl, image_url)')

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(200).json({ message: 'Carrinho vazio' });
  }

  return res.status(200).json({ data });
};
