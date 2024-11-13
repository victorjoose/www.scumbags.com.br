import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private userId = environment.emailServiceApiKey;
  private serviceId = environment.serviceId;
  private templateId = environment.templateId;
  private template2Id = environment.template2Id;

  sendContactEmail(templateParams: { name: string; email: string; title: string; text: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
  }

  sendSubscribeEmail(templateParams: { email: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.template2Id, templateParams, this.userId);
  }


}
