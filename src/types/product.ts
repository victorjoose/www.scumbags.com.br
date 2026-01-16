export interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
}

export interface ProductSku {
  id: number;
  produto_id: number;
  sku: string;
  name: string;
  tamanho: string | null;
  cor: string | null;
  preco_reais: number;
  estoque: number;
  image_url?: string | null;
}

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string | null;
  productId: number;
}
