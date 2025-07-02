const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('generate-env-config.js', () => {
  const rootDir = path.resolve(__dirname, '..');
  const envPath = path.join(rootDir, 'src/.env');
  const outputPath = path.join(rootDir, 'src/environments/env.test.ts');

  beforeAll(() => {
    fs.mkdirSync(path.dirname(envPath), { recursive: true });
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    fs.writeFileSync(envPath, [
      'VITE_EMAILJS_USER_ID=abc123',
      'VITE_EMAILJS_SERVICE_ID=svc456',
      'VITE_EMAILJS_TEMPLATE_ID=tpl789',
      'VITE_EMAILJS_TEMPLATE_2_ID=tpl999',
      'SUPABASE_URL=https://test.supabase.co',
      'SUPABASE_ANON_KEY=test_anon_key'
    ].join('\n'));
  });

  afterAll(() => {
    if (fs.existsSync(envPath)) fs.unlinkSync(envPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  });

  it('should generate environment file with correct content', () => {
    execSync(`node generate-env-config.js ./src/environments/env.test.ts ./src/.env`, {
      cwd: rootDir
    });

    const result = fs.readFileSync(outputPath, 'utf-8');
    expect(result).toContain("VITE_EMAILJS_USER_ID: 'abc123'");
    expect(result).toContain("VITE_EMAILJS_SERVICE_ID: 'svc456'");
    expect(result).toContain("VITE_EMAILJS_TEMPLATE_ID: 'tpl789'");
    expect(result).toContain("VITE_EMAILJS_TEMPLATE_2_ID: 'tpl999'");
    expect(result).toContain("SUPABASE_URL: 'https://test.supabase.co'");
    expect(result).toContain("SUPABASE_ANON_KEY: 'test_anon_key'");
    expect(result).toContain("MOCK_EMAIL: false");
  });
});
