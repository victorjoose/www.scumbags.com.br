import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    const defaultLang = 'pt';
    this.translate.setDefaultLang(defaultLang);
    this.languageService.setLanguage(defaultLang);
  }

  scrollToShop(): void {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
