import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { t } = useTranslation();
  const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, toggleCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <>
      <div className="cart-overlay" onClick={toggleCart} />
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>{t('store.cart.title', 'Seu Carrinho')}</h2>
          <button className="close-btn" onClick={toggleCart}>&times;</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty-cart">{t('store.cart.empty', 'Seu carrinho está vazio.')}</p>
          ) : (
            items.map(item => (
              <div key={item.sku} className="cart-item">
                <div className="item-image">
                    <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  {item.size && <span className="item-size">Size: {item.size}</span>}
                  <span className="item-price">R$ {item.price.toFixed(2)}</span>
                  
                  <div className="item-controls">
                    <button onClick={() => updateQuantity(item.sku, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.sku, item.quantity + 1)}>+</button>
                    <button className="remove-btn" onClick={() => removeFromCart(item.sku)}>
                        {t('store.cart.remove', 'Remover')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
                <span>Total:</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
                {t('store.cart.checkout', 'Finalizar Compra')}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .cart-drawer {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            max-width: 400px;
            height: 100%;
            background: var(--color-surface);
            z-index: 1000;
            box-shadow: -4px 0 10px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            animation: slideIn 0.3s ease-out;
        }
        .cart-header {
            padding: var(--space-md);
            border-bottom: 1px solid var(--color-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--color-text);
        }
        .cart-items {
            flex: 1;
            overflow-y: auto;
            padding: var(--space-md);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .cart-item {
            display: flex;
            gap: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--color-border);
        }
        .item-image img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
        }
        .item-info {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .item-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: auto;
        }
        .item-controls button {
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            color: var(--color-text);
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
        .remove-btn {
            width: auto !important;
            padding: 0 0.5rem;
            font-size: 0.8rem;
            margin-left: auto;
        }
        .cart-footer {
            padding: var(--space-md);
            border-top: 1px solid var(--color-border);
            background: var(--color-surface);
        }
        .cart-total {
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .checkout-btn {
            width: 100%;
            padding: 1rem;
            background: var(--color-accent);
            color: white;
            border: none;
            font-weight: bold;
            font-size: 1.1rem;
            cursor: pointer;
            text-transform: uppercase;
        }
        .checkout-btn:hover {
            background: var(--color-accent-hover);
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
