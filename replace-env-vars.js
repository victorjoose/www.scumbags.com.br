const fs = require('fs');
const path = './dist/scumbags/assets/environment.js';

fs.readFile(path, 'utf8', function (err, data) {
  if (err) return console.error(err);

  let result = data
    .replace(/VITE_EMAILJS_USER_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_USER_ID)
    .replace(/VITE_EMAILJS_SERVICE_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_SERVICE_ID)
    .replace(/VITE_EMAILJS_TEMPLATE_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_TEMPLATE_ID)
    .replace(/VITE_EMAILJS_TEMPLATE_2_ID_PLACEHOLDER/g, process.env.VITE_EMAILJS_TEMPLATE_2_ID);

  fs.writeFile(path, result, 'utf8', function (err) {
    if (err) return console.error(err);
    console.log('Environment variables replaced successfully.');
  });
});
