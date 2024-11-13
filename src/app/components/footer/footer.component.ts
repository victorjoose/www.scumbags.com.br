import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  email: string = '';
  subscriptionSent: boolean = false;
  subscriptionError: boolean = false;

  constructor(private emailService: EmailService) {}

  sendSubscriptionEmail() {
    const templateParams = {
      email: this.email,
    };
    this.emailService
      .sendSubscribeEmail(templateParams)
      .then(() => {
        this.subscriptionSent = true;
        this.resetButtonStateAfterDelay();
      })
      .catch(() => {
        this.subscriptionError = true;
        this.resetButtonStateAfterDelay();
      });
  }

  private resetButtonStateAfterDelay() {
    setTimeout(() => {
      this.subscriptionSent = false;
      this.subscriptionError = false;
      this.email = '';
    }, 5000);
  }
}
