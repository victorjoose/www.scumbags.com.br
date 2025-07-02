module.exports.createClient = jest.fn(() => ({
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
}));
