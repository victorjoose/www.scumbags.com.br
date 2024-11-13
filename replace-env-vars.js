const fs = require('fs');
const path = './dist/scumbags/assets/environment.vercel.js';

console.log("Injecting Vercel environment variables...");

fs.readFile(path, 'utf8', function (err, data) {
  if (err) return console.error("Error reading environment file:", err);

  let result = data
    .replace(/''/g, (match, offset) => {
      // Inject Vercel variables
      switch (offset) {
        case data.indexOf("emailServiceApiKey: ''"):
          return `'${process.env.VITE_EMAILJS_USER_ID}'`;
        case data.indexOf("serviceId: ''"):
          return `'${process.env.VITE_EMAILJS_SERVICE_ID}'`;
        case data.indexOf("templateId: ''"):
          return `'${process.env.VITE_EMAILJS_TEMPLATE_ID}'`;
        case data.indexOf("template2Id: ''"):
          return `'${process.env.VITE_EMAILJS_TEMPLATE_2_ID}'`;
        default:
          return match;
      }
    });

  fs.writeFile(path, result, 'utf8', function (err) {
    if (err) return console.error("Error writing environment file:", err);
    console.log("Environment variables injected successfully.");
  });
});
