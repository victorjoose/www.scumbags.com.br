import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { FormsModule } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TestTranslateModule, FormsModule],
      providers: [
        {
          provide: EmailService,
          useValue: { sendSubscribeEmail: () => Promise.resolve() },
        },
      ],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
