import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductModal } from './ProductModal';
import { supabase } from '../../services/supabase';
import type { ProductSku } from '../../types/product';

interface GroupedProduct {
    id: number;
    name: string;
    type: string; // derived from joining products or just placeholder
    price: number;
    image: string;
    skus: ProductSku[];
}

export function StoreGrid() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<GroupedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<GroupedProduct | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch SKUs and join with parent 'produtos' table to get the type
        const { data, error } = await supabase
            .from('produto_skus')
            .select(`
                *,
                produtos (
                    tipo
                )
            `)
            .eq('ativo', true); // Apenas produtos ativos
        
        if (error) throw error;
        
        if (data) {
            // PRIMEIRO: Filtrar apenas SKUs que têm imagem
            const skusWithImage = (data as any[]).filter(sku => 
                sku.image_url && sku.image_url.trim() !== ''
            );

            // SEGUNDO: Agrupar por nome do produto
            const grouped = skusWithImage.reduce((acc, sku) => {
                const existing = acc.find((p: GroupedProduct) => p.name === sku.nome);

                if (existing) {
                    existing.skus.push(sku);
                } else {
                    acc.push({
                        id: sku.id, 
                        name: sku.nome,
                        type: sku.produtos?.tipo || "Product",
                        price: sku.preco_reais,
                        image: sku.image_url,
                        skus: [sku]
                    });
                }
                return acc;
            }, [] as GroupedProduct[]);

            setProducts(grouped);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  // const displayProducts = products.length > 0 ? products : [ ... ]; 
  
  const finalProducts = products.length > 0 ? products : []; 

  return (
    <section className="store-section container" id="shop">
      <h2 className="section-title">{t('store.title')}</h2>
      
      {loading ? (
          <div className="loading">Cannot load products...</div>
      ) : (
        <div className="store-grid">
            {finalProducts.map(p => (
                <div key={p.id} className="store-item" onClick={() => setSelectedProduct(p)}>
                    <div className="image-wrapper">
                        <img src={p.image} alt={p.name} loading="lazy" />
                    </div>
                    <div className="item-details">
                        <h3 className="item-name">{p.name}</h3>
                        <span className="item-price">R$ {p.price.toFixed(2)}</span>
                    </div>
                </div>
            ))}
            {finalProducts.length === 0 && <p>No products found in database.</p>}
        </div>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <style>{`
        .store-section {
            padding: var(--space-lg) var(--space-sm);
        }
        .section-title {
            text-align: center;
            font-size: 3rem;
            margin-bottom: var(--space-md);
            color: var(--color-accent);
        }
        .store-grid {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Mobile starts with 2 cols */
            gap: var(--space-md) var(--space-sm); /* More gap between rows */
        }
        .store-item {
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
            display: flex;
            flex-direction: column;
        }
        .store-item:hover {
            opacity: 0.9;
        }
        .image-wrapper {
            margin-bottom: 0.5rem;
            transition: transform 0.2s;
        }
        .store-item:hover .image-wrapper {
            transform: scale(1.05);
        }
        .store-item img {
            width: 100%;
            height: auto;
            object-fit: contain;
        }
        .item-details {
            text-align: center;
        }
        .item-name {
            font-family: var(--font-body);
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 0.2rem;
            line-height: 1.2;
        }
        .item-price {
            font-family: var(--font-mono);
            color: var(--color-accent);
            font-size: 0.9rem;
        }
        .loading {
            text-align: center;
            font-size: 1.2rem;
            padding: 2rem;
        }

        @media (min-width: 768px) {
             .store-grid {
                grid-template-columns: repeat(4, 1fr); /* Desktop more cols */
            }
             .item-name {
                 font-size: 1rem;
             }
        }
      `}</style>
    </section>
  );
}
