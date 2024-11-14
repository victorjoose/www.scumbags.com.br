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

  sendContactEmail(templateParams: { name: string; email: string; title: string; text: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
  }

  sendSubscribeEmail(templateParams: { email: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.template2Id, templateParams, this.userId);
  }
}
