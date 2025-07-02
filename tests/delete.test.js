jest.mock('@supabase/supabase-js');

const httpMocks = require('node-mocks-http');
const deleteHandler = require('../api/cart/delete');
const { createClient } = require('@supabase/supabase-js');


describe('delete.js', () => {
  let req, res, supabaseMock;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'DELETE',
      query: { id: '5' }
    });
    res = httpMocks.createResponse();

    supabaseMock = {
      from: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnValue({ error: null }),
    };

    createClient.mockReturnValue(supabaseMock);
  });

  it('remove item corretamente com id válido', async () => {
    await deleteHandler(req, res);
    expect(res.statusCode).toBe(200);
    const json = res._getJSONData();
    expect(json.message).toBe('Item 5 deleted from cart');
  });

  it('retorna erro se id for inválido', async () => {
    req.query.id = 'abc';
    await deleteHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('retorna erro 500 se supabase falhar', async () => {
    supabaseMock.eq.mockReturnValueOnce({ error: { message: 'erro' } });
    await deleteHandler(req, res);
    expect(res.statusCode).toBe(500);
    const json = res._getJSONData();
    expect(json.error).toBe('erro');
  });

  it('retorna 405 para método diferente de DELETE', async () => {
    req.method = 'GET';
    await deleteHandler(req, res);
    expect(res.statusCode).toBe(405);
  });
});
