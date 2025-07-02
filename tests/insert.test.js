jest.mock('@supabase/supabase-js');

const httpMocks = require('node-mocks-http');
const insertHandler = require('../api/cart/insert');
const { createClient } = require('@supabase/supabase-js');


describe('insert.js', () => {
  let req, res, supabaseMock;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      body: {
        item_id: '123',
        size: 'M',
        quantity: 2,
        user_email: 'teste@scumstore.com',
      },
    });
    res = httpMocks.createResponse();

    supabaseMock = {
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnValue({ data: [{ id: 1 }], error: null }),
    };

    createClient.mockReturnValue(supabaseMock);
  });

  it('retorna 201 se inserção for bem-sucedida', async () => {
    await insertHandler(req, res);
    expect(res.statusCode).toBe(201);
    const json = res._getJSONData();
    expect(json.message).toBe('Item added to cart');
    expect(json.data).toEqual([{ id: 1 }]);
  });

  it('retorna 400 se item_id estiver ausente', async () => {
    req.body.item_id = null;
    await insertHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('retorna 405 para métodos diferentes de POST', async () => {
    req.method = 'GET';
    await insertHandler(req, res);
    expect(res.statusCode).toBe(405);
  });
});
