const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('mynode.js', () => {
  const envPath = path.join(__dirname, 'src/.env');
  const tempOutputPath = path.join(__dirname, 'src/environments/env.test.ts');

  beforeAll(() => {
    fs.mkdirSync(path.dirname(envPath), { recursive: true });
    fs.mkdirSync(path.dirname(tempOutputPath), { recursive: true });

    fs.writeFileSync(envPath, [
      'VITE_EMAILJS_USER_ID=abc123',
      'VITE_EMAILJS_SERVICE_ID=svc456',
      'VITE_EMAILJS_TEMPLATE_ID=tpl789',
      'VITE_EMAILJS_TEMPLATE_2_ID=tpl999'
    ].join('\n'));
  });

  afterAll(() => {
    if (fs.existsSync(envPath)) fs.unlinkSync(envPath);
    if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
  });

  it('should generate environment file with correct content', () => {
    execSync(`node mynode.js ./src/environments/env.test.ts`);

    const result = fs.readFileSync(tempOutputPath, 'utf-8');
    expect(result).toContain("VITE_EMAILJS_USER_ID: 'abc123'");
    expect(result).toContain("VITE_EMAILJS_SERVICE_ID: 'svc456'");
    expect(result).toContain("VITE_EMAILJS_TEMPLATE_ID: 'tpl789'");
    expect(result).toContain("VITE_EMAILJS_TEMPLATE_2_ID: 'tpl999'");
    expect(result).toContain("MOCK_EMAIL: false");
  });
});
