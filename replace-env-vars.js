const fs = require('fs');
const path = './dist/scumbags/assets/environment.js';

console.log("Injecting environment variables...");

fs.readFile(path, 'utf8', function (err, data) {
  if (err) return console.error("Error reading file:", err);

  // Replace placeholders with Vercel environment variables
  let result = data
    .replace(/VITE_EMAILJS_USER_ID/g, process.env.VITE_EMAILJS_USER_ID)
    .replace(/VITE_EMAILJS_SERVICE_ID/g, process.env.VITE_EMAILJS_SERVICE_ID)
    .replace(/VITE_EMAILJS_TEMPLATE_ID/g, process.env.VITE_EMAILJS_TEMPLATE_ID)
    .replace(/VITE_EMAILJS_TEMPLATE_2_ID/g, process.env.VITE_EMAILJS_TEMPLATE_2_ID);

  fs.writeFile(path, result, 'utf8', function (err) {
    if (err) return console.error("Error writing file:", err);
    console.log("Environment variables injected successfully.");
  });
});