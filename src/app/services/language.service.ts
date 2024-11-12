// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSource = new BehaviorSubject<string>('pt');
  currentLanguage = this.languageSource.asObservable();

  constructor(private translate: TranslateService) {}

  setLanguage(language: string) {
    this.languageSource.next(language);
    this.translate.use(language);
  }
}
