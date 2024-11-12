import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showLanguageDropdown = false;
  showNavDropdown = false;
  isMobile = false;
  isContactModalOpen = false;
  flagIcon = 'assets/imgs/flags/br.svg';
  altText = 'Portuguese Flag';
  languageLabel = 'Português';

  constructor(
    private languageService: LanguageService
  ) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.languageService.currentLanguage.subscribe((language) => {
      if (language === 'en') {
        this.flagIcon = 'assets/imgs/flags/us.svg';
        this.altText = 'English Flag';
        this.languageLabel = 'English';
      } else {
        this.flagIcon = 'assets/imgs/flags/br.svg';
        this.altText = 'Portuguese Flag';
        this.languageLabel = 'Português';
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.showNavDropdown = false;
    }
  }

  toggleNavDropdown() {
    this.showNavDropdown = !this.showNavDropdown;
  }

  toggleLanguageDropdown() {
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

  openContactModal() {
    this.isContactModalOpen = true;
  }

  closeContactModal() {
    this.isContactModalOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-dropdown') && !target.closest('.menu-button')) {
      this.showNavDropdown = false;
    }
    if (!target.closest('.language-dropdown-menu')&& !target.closest('.lang-toggle')) {
      this.showLanguageDropdown = false;
    }
  }

  scrollTo(id: string): void {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    this.showNavDropdown = false;
    this.showLanguageDropdown = false;
  }

  switchLanguage(language: string): void {
    this.languageService.setLanguage(language);  
    setTimeout(() => {
      this.showLanguageDropdown = false;
    }, 0);
  }
}
