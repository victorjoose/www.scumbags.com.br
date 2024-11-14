const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'}); ;

const envFile = `export const environment = {
    emailServiceApiKey: '${process.env.VITE_EMAILJS_USER_ID}',
    serviceId: '${process.env.VITE_EMAILJS_SERVICE_ID}',
    templateId: '${process.env.VITE_EMAILJS_TEMPLATE_ID}',
    template2Id: '${process.env.VITE_EMAILJS_TEMPLATE_2_ID}',
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