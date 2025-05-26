import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private userId = environment.VITE_EMAILJS_USER_ID;
  private serviceId = environment.VITE_EMAILJS_SERVICE_ID;
  private templateId = environment.VITE_EMAILJS_TEMPLATE_ID;
  private template2Id = environment.VITE_EMAILJS_TEMPLATE_2_ID;
  private isMock = environment.MOCK_EMAIL;
  
  sendContactEmail(templateParams: { name: string; email: string; title: string; text: string }): Promise<EmailJSResponseStatus> {
    if (this.isMock) {
      console.log('📨 (Mock) Email de contato enviado:', templateParams);
      return Promise.resolve({ status: 200, text: 'Mocked success' } as EmailJSResponseStatus);
    }

    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
  }

  sendSubscribeEmail(templateParams: { email: string }): Promise<EmailJSResponseStatus> {
    if (this.isMock) {
      console.log('📨 (Mock) Email de inscrição enviado:', templateParams);
      return Promise.resolve({ status: 200, text: 'Mocked success' } as EmailJSResponseStatus);
    }

    return emailjs.send(this.serviceId, this.template2Id, templateParams, this.userId);
  }
}
