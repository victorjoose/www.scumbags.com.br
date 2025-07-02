# Scumbags Website + Scumstore

Este repositório contém o código-fonte do site oficial da banda Scumbags, incluindo a **Scumstore**, uma loja online integrada para comercialização de produtos oficiais.

---

## Tecnologias Utilizadas

### Front-end
- Angular 16
- @ngx-translate para internacionalização (PT-BR e EN)
- SCSS + HTML5 responsivo

### Back-end (Serverless)
- Node.js com funções serverless (Vercel)
- Supabase (PostgreSQL e autenticação)
- EmailJS (envio de e-mails via frontend)

### Testes
- Jest (testes unitários e de API)
- Karma + Jasmine (testes Angular)
- Postman (testes de integração)

---

## Funcionalidades

- Exibição de produtos por categoria (camisetas, CDs, bonés etc.)
- Carrinho de compras com suporte a múltiplos itens e variações
- Integração com Supabase para persistência dos dados
- Localização da interface por idioma
- Envio de pedidos e mensagens via EmailJS

---

## Executando Localmente

### Requisitos
- Node.js 18+
- Angular CLI
- Conta no Supabase
- Arquivo `.env.local` com as variáveis:

```env
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
```

### Instalação e Execução

```bash
npm install
npm run dev
```

> O script `generate-env-config.js` é responsável por repassar variáveis de ambiente ao Angular.

---

## Testes

### Unitários (Angular)

```bash
npm run test
```

### API (Jest)

```bash
npm run test:apis
```

### Com cobertura

```bash
npm run test:apis:coverage
```

---

## Estrutura

```
├── api/                  # Funções serverless (insert, list, delete)
├── src/                  # Código Angular
├── tests/                # Testes unitários das APIs
├── .env.local
├── generate-env-config.js
```

---

## Métricas de Testes

| Tipo        | Qtde | Status   |
|-------------|------|----------|
| Unitários   | 13   | Aprovado |
| Integração  | 2    | Aprovado |
| API         | 3    | Aprovado |
| Usabilidade | 3    | Aprovado |

Cobertura estimada: **~85%**

---

## Licença

Este projeto é público e pode ser usado como referência educacional ou portfólio técnico.