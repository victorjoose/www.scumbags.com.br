const fs = require('fs');
const path = './dist/scumbags/assets/environment.js';

console.log('Replacing environment variables...');
console.log('User ID:', process.env.VITE_EMAILJS_USER_ID);
console.log('Service ID:', process.env.VITE_EMAILJS_SERVICE_ID);
console.log('Template ID:', process.env.VITE_EMAILJS_TEMPLATE_ID);
console.log('Template 2 ID:', process.env.VITE_EMAILJS_TEMPLATE_2_ID);

fs.readFile(path, 'utf8', function (err, data) {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  let result = data
    .replace(/VITE_EMAILJS_USER_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_USER_ID)
    .replace(/VITE_EMAILJS_SERVICE_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_SERVICE_ID)
    .replace(/VITE_EMAILJS_TEMPLATE_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_TEMPLATE_ID)
    .replace(/VITE_EMAILJS_TEMPLATE_2_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_TEMPLATE_2_ID);

  fs.writeFile(path, result, 'utf8', function (err) {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Environment variables replaced successfully.');
  });
});
