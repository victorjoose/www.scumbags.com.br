const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Missing or invalid id' });
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', Number(id));

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: `Item ${id} deleted from cart` });
};
