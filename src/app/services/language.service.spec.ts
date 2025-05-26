import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';
import { TestTranslateModule } from '../../../tests/test-translate.module';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService],
      imports: [TestTranslateModule]
    });

    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set language and call translate.use()', () => {
    spyOn(translateService, 'use');
    service.setLanguage('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should emit the new language in currentLanguage observable', (done) => {
    service.setLanguage('en');
    service.currentLanguage.subscribe(lang => {
      expect(lang).toBe('en');
      done();
    });
  });
});
