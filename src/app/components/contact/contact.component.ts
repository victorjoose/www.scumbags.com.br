import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  name = '';
  email = '';
  title = '';
  text = '';
  emailSent = false;
  emailError = false;

  constructor(private emailService: EmailService) {}

  closeModal() {
    this.close.emit();
  }

  sendEmail() {
    const templateParams = {
      name: this.name,
      email: this.email,
      title: this.title,
      text: this.text
    };

    this.emailService.sendEmail(templateParams)
      .then(() => {
        this.emailSent = true;
        setTimeout(() => {
          this.fadeOutModal();
        }, 2000);
      })
      .catch(() => {
        this.emailError = true;
        setTimeout(() => {
          this.emailError = false;
        }, 3000);
      });
  }

  fadeOutModal() {
    this.isOpen = false;
    setTimeout(() => {
      this.closeModal();
      this.emailSent = false;
    }, 500);
  }
}
