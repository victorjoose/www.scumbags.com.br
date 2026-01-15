import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import type { ProductSku } from '../../types/product';

interface GroupedProduct {
    id: number;
    name: string;
    type: string;
    price: number;
    image: string;
    skus: ProductSku[];
}

interface ProductModalProps {
  product: GroupedProduct;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [selectedSku, setSelectedSku] = useState<ProductSku | null>(null);

  // Derived available sizes from SKUs
  const { sizes, skusBySize } = useMemo(() => {
    const map = new Map<string, ProductSku>();
    const available: string[] = [];
    
    product.skus.forEach(sku => {
        if (sku.tamanho) {
            map.set(sku.tamanho, sku);
            available.push(sku.tamanho);
        }
    });

    // Sort sizes logically if possible (P, M, G, GG, etc.)
    const order = ['P', 'M', 'G', 'GG', 'XG'];
    available.sort((a, b) => {
        const idxA = order.indexOf(a);
        const idxB = order.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return a.localeCompare(b);
    });

    return { sizes: available, skusBySize: map };
  }, [product.skus]);

  const handleAddToCart = () => {
    if (!selectedSku) return;
    
    addToCart({
        sku: selectedSku.sku,
        name: selectedSku.name,
        price: selectedSku.preco_reais, // Use the price from the SKU (might be different?)
        quantity: 1,
        image: product.image, // Use the main product image or selectedSku.image_url if available
        size: selectedSku.tamanho,
        productId: product.id
    });
    onClose();
  };

  const hasStock = (sku: ProductSku) => sku.estoque > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label={t('store.close')}>
            &times;
        </button>
        
        <div className="modal-grid">
            <div className="modal-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="modal-details">
                <span className="modal-type">{product.type}</span>
                <h2 className="modal-title">{product.name}</h2>
                <span className="modal-price">R$ {product.price.toFixed(2)}</span>
                
                <div className="modal-actions">
                    {sizes.length > 0 && (
                        <>
                            <label>{t('store.select_size')}</label>
                            <div className="size-buttons">
                                {sizes.map(size => {
                                    const sku = skusBySize.get(size)!;
                                    const inStock = hasStock(sku);
                                    return (
                                        <button 
                                            key={size}
                                            className={`size-btn ${selectedSku?.tamanho === size ? 'selected' : ''}`}
                                            disabled={!inStock}
                                            onClick={() => setSelectedSku(sku)}
                                            title={!inStock ? "Out of Stock" : ""}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                    
                    <button 
                        className="cart-btn" 
                        disabled={sizes.length > 0 && !selectedSku} 
                        onClick={handleAddToCart}
                    >
                        {t('store.add_to_bag')}
                    </button>
                </div>
            </div>
        </div>

      </div>
      <style>{`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-sm);
        }
        .modal-content {
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            width: 100%;
            max-width: 800px;
            position: relative;
            animation: fadeIn 0.2s ease-out;
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            line-height: 1;
            z-index: 2;
            background: none;
            border: none;
            color: var(--color-text);
            cursor: pointer;
        }
        .modal-grid {
            display: grid;
            grid-template-columns: 1fr;
        }
        .modal-image {
            background: radial-gradient(circle, #333, #000);
            padding: var(--space-md);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 300px;
        }
        .modal-image img {
            max-height: 300px;
            width: auto;
        }
        .modal-details {
            padding: var(--space-md);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .modal-type {
            color: #888;
            text-transform: uppercase;
            font-size: 0.9rem;
        }
        .modal-title {
            font-size: 2rem;
            line-height: 1;
        }
        .modal-price {
            font-family: var(--font-mono);
            font-size: 1.5rem;
            color: var(--color-accent);
        }
        .modal-actions {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .size-buttons {
            display: flex;
            gap: 0.5rem;
        }
        .size-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--color-border);
            background: var(--color-bg);
            color: var(--color-text);
            cursor: pointer;
            transition: all 0.2s;
            min-width: 40px;
        }
        .size-btn:hover:not(:disabled) {
            border-color: var(--color-accent);
        }
        .size-btn.selected {
            background: var(--color-accent);
            border-color: var(--color-accent);
            color: #fff;
        }
        .size-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
            text-decoration: line-through;
        }
        
        .cart-btn {
            width: 100%;
            padding: 1rem;
            background: var(--color-accent);
            border: none;
            font-weight: bold;
            font-size: 1.1rem;
            cursor: pointer;
            color: #fff;
            text-transform: uppercase;
        }
        .cart-btn:hover:not(:disabled) {
            background: var(--color-accent-hover);
        }
        .cart-btn:disabled {
            background: #333;
            cursor: not-allowed;
        }

        @media (min-width: 768px) {
            .modal-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
