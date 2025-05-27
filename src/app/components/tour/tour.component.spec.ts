import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourComponent } from './tour.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

class MockTranslateService {
  currentLang = 'pt';
  defaultLang = 'pt';
  onLangChange = of({ lang: 'en' });
}

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourComponent],
      imports: [TestTranslateModule],
      providers: [{ provide: TranslateService, useClass: MockTranslateService }],
    });

    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should normalize language codes', () => {
    expect(component.normalizeLanguageCode('pt-BR')).toBe('pt');
    expect(component.normalizeLanguageCode('en-US')).toBe('en');
  });

  it('should set currentLanguage to normalized currentLang on init', () => {
    expect(component.currentLanguage).toBe('en');
  });

  it('should update currentLanguage on lang change', () => {
    // for onLangChange: it emits 'en-US' in the mock
    component.ngOnInit(); // already called by fixture.detectChanges
    expect(component.currentLanguage).toBe('en');
  });

  it('should return true if language is Portuguese', () => {
    component.currentLanguage = 'pt';
    expect(component.isPortuguese()).toBeTrue();
    expect(component.isEnglish()).toBeFalse();
  });

  it('should return true if language is English', () => {
    component.currentLanguage = 'en';
    expect(component.isEnglish()).toBeTrue();
    expect(component.isPortuguese()).toBeFalse();
  });
});
