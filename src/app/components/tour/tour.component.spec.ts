import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from 'src/app/services/language.service';
import { TourComponent } from './tour.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

class MockTranslateService {
  currentLang = 'pt-BR';
  defaultLang = 'pt';
  onLangChange = of({ lang: 'pt-BR' });
}

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourComponent],
      imports: [TestTranslateModule],
      providers: [
        { provide: LanguageService, useValue: {} },
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    });

    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
