# 📦 Banco de Dados — Loja da Banda (v3)

Adição das tabelas de **Pedidos** e **Itens do Pedido**.

---

## 🧠 Conceito Geral

- **Pedidos**: Registram a transação, o cliente e o status do pagamento.
- **Itens do Pedido**: Registram quais SKUs foram comprados, o preço *no momento da compra* e a quantidade.
- **Integração Abacate Pay**: O campo `payment_id` armazena o ID da cobrança no Abacate Pay.

---

## 🧾 Tabela: orders

Armazena os pedidos realizados.

```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Cliente
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_tax_id TEXT, -- CPF/CNPJ (Opcional ou obrigatório dependendo da regra de negócio)
  
  -- Endereço de Entrega (Snapshot)
  address_zip TEXT NOT NULL,
  address_street TEXT NOT NULL,
  address_number TEXT NOT NULL,
  address_complement TEXT,
  address_neighborhood TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_state TEXT NOT NULL,

  -- Status e Pagamento
  status TEXT DEFAULT 'pending', -- pending, paid, canceled, shipped
  payment_id TEXT, -- ID da cobrança no Abacate Pay
  payment_url TEXT, -- URL para pagamento (se houver redirect)
  
  -- Valores
  total_amount NUMERIC(10,2) NOT NULL
);
```

---

## 📦 Tabela: order_items

Itens vinculados a um pedido.

```sql
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  
  sku TEXT NOT NULL, -- Mantemos o SKU texto para referência histórica fácil
  name TEXT NOT NULL, -- Nome do produto + variação
  size TEXT,          -- Tamanho escolhido
  
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL, -- Preço unitário NO MOMENTO DA COMPRA
  image_url TEXT -- Snapshot da imagem
);
```

```sql
CREATE INDEX idx_orders_email ON orders (customer_email);
CREATE INDEX idx_order_items_order_id ON order_items (order_id);
```
