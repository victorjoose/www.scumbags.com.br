import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { CartService } from 'src/app/services/cart.service';
import { isMobileScreen } from 'src/app/utils/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLanguageDropdown = false;
  showNavDropdown = false;
  isMobile = false;
  isContactModalOpen = false;
  flagIcon = 'assets/imgs/flags/br.svg';
  altText = 'Portuguese Flag';
  languageLabel = 'Português';
  cartItemCount = 0;

  constructor(
    private languageService: LanguageService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.checkScreenSize();

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

    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = isMobileScreen();
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
    if (!target.closest('.language-dropdown-menu') && !target.closest('.lang-toggle')) {
      this.showLanguageDropdown = false;
    }
  }

  scrollTo(id: string): void {
    const isOnHomePage = this.router.url === '/';

    if (isOnHomePage) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      location.href = `/?scrollTo=${id}`;
    }

    this.showNavDropdown = false;
    this.showLanguageDropdown = false;
  }

  switchLanguage(language: string): void {
    this.languageService.setLanguage(language);
    setTimeout(() => (this.showLanguageDropdown = false), 0);
  }

  goToCart() {
    this.router.navigate(['/checkout']);
  }
}
