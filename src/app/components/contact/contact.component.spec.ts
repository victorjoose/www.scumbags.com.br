import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { FormsModule } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { EmailJSResponseStatus } from 'emailjs-com';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let emailServiceSpy: jasmine.SpyObj<EmailService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('EmailService', ['sendContactEmail']);

    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [TestTranslateModule, FormsModule],
      providers: [{ provide: EmailService, useValue: spy }]
    });

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    emailServiceSpy = TestBed.inject(EmailService) as jasmine.SpyObj<EmailService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send email successfully and trigger fadeOut', fakeAsync(() => {
    emailServiceSpy.sendContactEmail.and.returnValue(
      Promise.resolve({ status: 200, text: 'OK' } as EmailJSResponseStatus)
    );

    component.name = 'Test User';
    component.email = 'test@example.com';
    component.title = 'Subject';
    component.text = 'Message body';
    component.sendEmail();

    tick(); // wait for promise resolve
    expect(component.emailSent).toBeTrue();

    tick(2000); // wait for fadeOut trigger
    expect(component.isOpen).toBeFalse();

    tick(500); // wait for modal to close
    expect(component.emailSent).toBeFalse();
  }));

  it('should handle email sending error', fakeAsync(() => {
    emailServiceSpy.sendContactEmail.and.returnValue(Promise.reject());

    component.sendEmail();
    tick(); // simulate async
    expect(component.emailError).toBeTrue();

    tick(3000);
    expect(component.emailError).toBeFalse();
  }));

  it('should emit close event on closeModal', () => {
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
