import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { FormsModule } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { EmailJSResponseStatus } from 'emailjs-com';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let emailServiceSpy: jasmine.SpyObj<EmailService>;

  beforeEach(() => {
    emailServiceSpy = jasmine.createSpyObj('EmailService', ['sendSubscribeEmail']);

    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TestTranslateModule, FormsModule],
      providers: [{ provide: EmailService, useValue: emailServiceSpy }],
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set subscriptionSent to true on successful subscription', fakeAsync(() => {
    emailServiceSpy.sendSubscribeEmail.and.returnValue(Promise.resolve({ status: 200, text: 'OK' } as EmailJSResponseStatus));

    component.email = 'test@example.com';
    component.sendSubscriptionEmail();
    tick(); // resolve promise

    expect(component.subscriptionSent).toBeTrue();
    expect(component.subscriptionError).toBeFalse();

    tick(5000); // wait 5s
    expect(component.subscriptionSent).toBeFalse();
    expect(component.email).toBe('');
  }));

  it('should set subscriptionError to true on failed subscription', fakeAsync(() => {
    emailServiceSpy.sendSubscribeEmail.and.returnValue(Promise.reject());

    component.email = 'fail@example.com';
    component.sendSubscriptionEmail();
    tick(); // resolve promise rejection

    expect(component.subscriptionSent).toBeFalse();
    expect(component.subscriptionError).toBeTrue();

    tick(5000); // wait 5s
    expect(component.subscriptionError).toBeFalse();
    expect(component.email).toBe('');
  }));
});
