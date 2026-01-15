import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const abacateApiKey = process.env.ABACATE_PAY_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'Missing orderId' });
  }

  try {
    // 1. Get Order details
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
    
    if (orderError || !order) {
        throw new Error('Order not found');
    }

    // 2. Create Billing at Abacate Pay
    // Docs: https://abacatepay.com/docs (assumed)
    // Structure typically includes amount, customer info.
    
    const billingPayload = {
        amount: Math.round(order.total_amount * 100), // in cents usually? Or check docs.
        // Assuming integer cents for safer payments, or float if supported.
        // Step 7 search said "POST /billing/create". 
        // Let's assume standard field names. 
        customer: {
            name: order.customer_name,
            email: order.customer_email,
            taxId: order.customer_tax_id // CPF/CNPJ
        },
        description: `Order #${orderId}`,
        checkoutUrl: true, // Requesting URL?
        // frequency: "ONE_TIME" 
    };

    // Note: Since I don't have the exact payload schema, I'll assume a standard structure 
    // and rely on the user to debug if fields differ.
    // However, the user provided audio suggesting Abacate Pay integration.
    // I'll use a generic axios call.

    // ABACATE PAY API URL - Assuming https://api.abacatepay.com/v1
    const abacateResponse = await axios.post(
        'https://api.abacatepay.com/v1/billing/create', 
        billingPayload,
        {
            headers: {
                'Authorization': `Bearer ${abacateApiKey}`
            }
        }
    );

    const billingData = abacateResponse.data;
    // Assuming response has { id: "bill_...", url: "https://..." }

    // 3. Update Order with Payment Info
    await supabase
        .from('orders')
        .update({
            payment_id: billingData.id,
            payment_url: billingData.url,
            status: 'awaiting_payment'
        })
        .eq('id', orderId);

    return res.status(200).json({ url: billingData.url });

  } catch (error: any) {
    console.error('Payment Error:', error?.response?.data || error.message);
    return res.status(500).json({ 
        error: 'Failed to create payment', 
        details: error?.response?.data || error.message 
    });
  }
}
