import { useState } from 'react';

import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../services/supabase';

// createOrder removed as it was unused and logic is implemented in handleSubmit

export function Checkout() {
  /* const { t } = useTranslation(); removed */
  const { items, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    zip: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        // 1. Create Order in Supabase
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                customer_name: formData.name,
                customer_email: formData.email,
                customer_tax_id: formData.cpf,
                address_zip: formData.zip,
                address_street: formData.street,
                address_number: formData.number,
                address_complement: formData.complement,
                address_neighborhood: formData.neighborhood,
                address_city: formData.city,
                address_state: formData.state,
                total_amount: cartTotal,
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create Order Items
        const orderItems = items.map(item => ({
            order_id: order.id,
            sku: item.sku,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            unit_price: item.price,
            image_url: item.image
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // 3. Call Abacate Pay (via API or direct if simple)
        // Note: For security, Abacate Pay API Key should not be on client.
        // We will implement the API endpoint next.
        // For now, simulate redirect.
        
        // TODO: Call /api/create-payment
        const response = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order.id })
        });
        
        const result = await response.json();
        if (result.url) {
            window.location.href = result.url;
        } else {
            alert("Payment integration pending");
        }

    } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to create order");
    } finally {
        setLoading(false);
    }
  };

  if (items.length === 0) {
      return <div className="container checkout-page"><p>Your cart is empty.</p></div>
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>
      
      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Shipping Info</h2>
            <div className="form-group">
                <label>Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>CPF (Tax ID)</label>
                <input required name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" />
            </div>
            
            <div className="form-row">
                <div className="form-group">
                    <label>CEP (Zip)</label>
                    <input required name="zip" value={formData.zip} onChange={handleChange} />
                </div>
                 <div className="form-group flex-2">
                    <label>City</label>
                    <input required name="city" value={formData.city} onChange={handleChange} />
                </div>
                 <div className="form-group">
                    <label>State</label>
                    <input required name="state" value={formData.state} onChange={handleChange} maxLength={2} />
                </div>
            </div>

             <div className="form-row">
                 <div className="form-group flex-2">
                    <label>Street</label>
                    <input required name="street" value={formData.street} onChange={handleChange} />
                </div>
                 <div className="form-group">
                    <label>Number</label>
                    <input required name="number" value={formData.number} onChange={handleChange} />
                </div>
            </div>
             <div className="form-group">
                <label>Neighborhood</label>
                <input required name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
            </div>
             <div className="form-group">
                <label>Complement</label>
                <input name="complement" value={formData.complement} onChange={handleChange} />
            </div>

            <button type="submit" className="pay-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Pay with Pix (Abacate Pay)'}
            </button>
            {error && <p className="error-msg">{error}</p>}
        </form>

        <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
                {items.map(item => (
                    <div key={item.sku} className="summary-item">
                        <span>{item.quantity}x {item.name} ({item.size})</span>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="summary-total">
                <span>Total</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
        </div>
      </div>

      <style>{`
        .checkout-page {
            padding: var(--space-lg) var(--space-sm);
            color: var(--color-text);
        }
        .checkout-page h1 {
            margin-bottom: var(--space-md);
            text-align: center;
        }
        .checkout-grid {
            display: grid;
            gap: var(--space-lg);
        }
        .checkout-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .form-row {
            display: flex;
            gap: 1rem;
        }
        .flex-2 { flex: 2; }
        
        input {
            padding: 0.8rem;
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            color: var(--color-text);
            border-radius: 4px;
        }
        .pay-btn {
            background: #00AA00; /* Green for payment */
            color: white;
            padding: 1rem;
            font-size: 1.1rem;
            border: none;
            cursor: pointer;
            font-weight: bold;
            margin-top: 1rem;
        }
        .pay-btn:hover {
            background: #008800;
        }
        .pay-btn:disabled {
            background: #555;
            cursor: not-allowed;
        }
        .error-msg {
            color: red;
        }

        .order-summary {
            background: var(--color-surface);
            padding: var(--space-md);
            border: 1px solid var(--color-border);
            height: fit-content;
        }
        .summary-items {
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .summary-item {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
        }
        .summary-total {
            border-top: 1px solid var(--color-border);
            padding-top: 1rem;
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--color-accent);
        }

        @media (min-width: 768px) {
            .checkout-grid {
                grid-template-columns: 2fr 1fr;
            }
        }
      `}</style>
    </div>
  );
}
