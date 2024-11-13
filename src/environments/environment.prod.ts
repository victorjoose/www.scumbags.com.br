export const environment = {
  production: true,
  emailServiceApiKey: process.env['VITE_EMAILJS_USER_ID'],
  serviceId: process.env['VITE_EMAILJS_SERVICE_ID'],
  templateId: process.env['VITE_EMAILJS_TEMPLATE_ID'],
  template2Id: process.env['VITE_EMAILJS_TEMPLATE_2_ID']
};
