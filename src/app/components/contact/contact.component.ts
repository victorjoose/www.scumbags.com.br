import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { isMobileScreen } from 'src/app/utils/utils';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  isMobile = false;

  name = '';
  email = '';
  title = '';
  text = '';
  emailSent = false;
  emailError = false;

  errors = {
    name: false,
    email: false,
    title: false,
    text: false,
    invalidEmail: false
  };

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize') onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = isMobileScreen();
  }

  closeModal() {
    this.close.emit();
  }

  sendEmail() {
    if (!this.isFormValid()) return;

    const templateParams = {
      name: this.name,
      email: this.email,
      title: this.title,
      text: this.text
    };

    this.emailService.sendContactEmail(templateParams)
      .then(() => {
        this.emailSent = true;
        setTimeout(() => this.fadeOutModal(), 2000);
      })
      .catch(() => {
        this.emailError = true;
        setTimeout(() => this.emailError = false, 3000);
      });
  }

  isFormValid(): boolean {
    const { name, email, title, text } = this;

      this.errors = {
      name: false,
      email: false,
      title: false,
      text: false,
      invalidEmail: false
    };

    let valid = true;

    if (!name.trim()) {
      this.errors.name = true;
      valid = false;
    }

    if (!email.trim()) {
      this.errors.email = true;
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errors.invalidEmail = true;
      valid = false;
    }

    if (!title.trim()) {
      this.errors.title = true;
      valid = false;
    }

    if (!text.trim()) {
      this.errors.text = true;
      valid = false;
    }

    return valid;
  }

  fadeOutModal() {
    this.isOpen = false;
    setTimeout(() => {
      this.closeModal();
      this.emailSent = false;
    }, 500);
  }
}
