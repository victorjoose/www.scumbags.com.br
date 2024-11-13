import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendContactEmail(templateParams: { name: string; email: string; title: string; text: string }): Promise<any> {
    return this.http.post('/api/sendEmail', templateParams).toPromise();
  }

  sendSubscribeEmail(templateParams: { email: string }): Promise<any> {
    return this.http.post('/api/sendEmail', templateParams).toPromise();
  }
}
