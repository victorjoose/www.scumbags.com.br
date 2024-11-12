// tour.component.ts
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  currentLanguage: string = 'pt';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.currentLanguage = this.normalizeLanguageCode(
      this.translate.currentLang || this.translate.defaultLang
    );

    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = this.normalizeLanguageCode(event.lang);
    });
  }

  normalizeLanguageCode(lang: string): string {
    return lang.split('-')[0];
  }

  isEnglish(): boolean {
    return this.currentLanguage === 'en';
  }

  isPortuguese(): boolean {
    return this.currentLanguage === 'pt';
  }
}
