
# 📦 Banco de Dados — Loja da Banda (Supabase / PostgreSQL)

Documentação completa da modelagem do banco de dados da loja da banda.
Pensado para funcionar **sem backend tradicional**, usando **Supabase (Postgres)**
e **Serverless Functions (Vercel)**, com integração ao **Mercado Pago**.

---

## 🧠 Conceito Geral

- Produto = tipo do item (Camiseta, Moletom, Boné, CD)
- SKU = item vendável real (Camiseta Killer Crab M, Boné Azul)
- Estampa faz parte do nome do SKU
- Estoque é controlado por SKU
- Pedido guarda snapshot de endereço e preços

---

## 🗂️ Tabela: produtos

```sql
CREATE TABLE produtos (
  id            BIGSERIAL PRIMARY KEY,
  tipo          TEXT NOT NULL,
  descricao     TEXT NULL,
  ativo         BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT uq_produtos_tipo UNIQUE (tipo)
);
```

```sql
INSERT INTO produtos (tipo) VALUES
('Camiseta'), ('Moletom'), ('Boné'), ('CD');
```

---

## 🧾 Tabela: produto_skus

```sql
CREATE TABLE produto_skus (
  id             BIGSERIAL PRIMARY KEY,
  produto_id     BIGINT NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,

  sku            TEXT NOT NULL UNIQUE,
  nome           TEXT NOT NULL,
  tamanho        TEXT NULL,
  cor            TEXT NULL,

  preco_reais    NUMERIC(10,2) NOT NULL CHECK (preco_reais >= 0),
  estoque        INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0),

  ativo          BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT uq_sku_comb UNIQUE (produto_id, nome, tamanho, cor)
);
```

```sql
CREATE INDEX idx_skus_produto_id ON produto_skus (produto_id);
CREATE INDEX idx_skus_nome       ON produto_skus (nome);
CREATE INDEX idx_skus_tamanho    ON produto_skus (tamanho);
```

```sql
INSERT INTO produto_skus (produto_id, sku, nome, tamanho, preco_reais, estoque)
VALUES
((SELECT id FROM produtos WHERE tipo='Camiseta'), 'CAM-KC-P', 'Camiseta Killer Crab', 'P', 69.90, 10),
((SELECT id FROM produtos WHERE tipo='Camiseta'), 'CAM-KC-M', 'Camiseta Killer Crab', 'M', 69.90, 12),
((SELECT id FROM produtos WHERE tipo='Camiseta'), 'CAM-KC-G', 'Camiseta Killer Crab', 'G', 69.90, 8);

INSERT INTO produto_skus (produto_id, sku, nome, preco_reais, estoque)
VALUES
((SELECT id FROM produtos WHERE tipo='Boné'), 'BONE-AZ-U', 'Boné Azul', 79.90, 30);
```
