jest.mock('@supabase/supabase-js');

const httpMocks = require('node-mocks-http');
const listHandler = require('../api/cart/list');
const { createClient } = require('@supabase/supabase-js');


describe('list.js', () => {
  let req, res, supabaseMock;

  beforeEach(() => {
    req = httpMocks.createRequest({ method: 'GET' });
    res = httpMocks.createResponse();

    supabaseMock = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn(),
    };

    createClient.mockReturnValue(supabaseMock);
  });

  it('retorna dados quando o carrinho não está vazio', async () => {
    supabaseMock.select.mockReturnValue({
      data: [{ id: 1, item_id: 'abc', quantity: 2, items: { name: 'Produto X' } }],
      error: null,
    });

    await listHandler(req, res);

    expect(res.statusCode).toBe(200);
    const json = res._getJSONData();
    expect(json.data).toBeDefined();
    expect(json.data.length).toBe(1);
  });

  it('retorna mensagem quando o carrinho está vazio', async () => {
    supabaseMock.select.mockReturnValue({ data: [], error: null });

    await listHandler(req, res);

    expect(res.statusCode).toBe(200);
    const json = res._getJSONData();
    expect(json.message).toBe('Carrinho vazio');
  });

  it('retorna erro 500 se houver falha no Supabase', async () => {
    supabaseMock.select.mockReturnValue({ data: null, error: { message: 'Falha' } });

    await listHandler(req, res);

    expect(res.statusCode).toBe(500);
    const json = res._getJSONData();
    expect(json.error).toBe('Falha');
  });

  it('retorna 405 para método inválido', async () => {
    req.method = 'POST';
    await listHandler(req, res);
    expect(res.statusCode).toBe(405);
  });
});
