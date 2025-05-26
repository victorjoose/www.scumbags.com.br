const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
require('dotenv').config({ path: 'src/.env' });

const envFile = `export const environment = {
    production: true,
    MOCK_EMAIL: false,
    VITE_EMAILJS_USER_ID: '${process.env.VITE_EMAILJS_USER_ID}',
    VITE_EMAILJS_SERVICE_ID: '${process.env.VITE_EMAILJS_SERVICE_ID}',
    VITE_EMAILJS_TEMPLATE_ID: '${process.env.VITE_EMAILJS_TEMPLATE_ID}',
    VITE_EMAILJS_TEMPLATE_2_ID: '${process.env.VITE_EMAILJS_TEMPLATE_2_ID}',
};`;

const targetPath = path.join(__dirname, './src/environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
    }
});
