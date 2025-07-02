const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';

const output = process.argv[2] || './src/environments/environment.development.ts';

const envFilePath = process.argv[3] || path.join(__dirname, '.env');

require('dotenv').config({ path: envFilePath });

const envFile = `export const environment = {
  production: true,
  MOCK_EMAIL: false,
  VITE_EMAILJS_USER_ID: '${process.env.VITE_EMAILJS_USER_ID}',
  VITE_EMAILJS_SERVICE_ID: '${process.env.VITE_EMAILJS_SERVICE_ID}',
  VITE_EMAILJS_TEMPLATE_ID: '${process.env.VITE_EMAILJS_TEMPLATE_ID}',
  VITE_EMAILJS_TEMPLATE_2_ID: '${process.env.VITE_EMAILJS_TEMPLATE_2_ID}',
  SUPABASE_URL: '${process.env.SUPABASE_URL}',
  SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY}',
};`;

const targetPath = path.join(__dirname, output);
fs.writeFile(targetPath, envFile, (err) => {
  if (err) throw err;
  console.log(successColor, `${checkSign} Successfully generated ${output}`);
});
