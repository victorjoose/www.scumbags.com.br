import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-scumstore',
  templateUrl: './scumstore.component.html',
  styleUrls: ['./scumstore.component.css']
})
export class ScumstoreComponent {

  currencyCode = ''

  products = [
    { 
      nameKey: 'SCUMSTORE.RAT_ABDUCTION', 
      priceUsd: 45.00, 
      priceBrl: 90.00, 
      imageUrl: 'assets/imgs/store/tee-1-a.jpg' 
    },
    { 
      nameKey: 'SCUMSTORE.RAT_OVERLAY_RED', 
      priceUsd: 40.00, 
      priceBrl: 70.00, 
      imageUrl: 'assets/imgs/store/tee-2-a.jpg' 
    },
    { 
      nameKey: 'SCUMSTORE.RAT_OVERLAY_BLACK', 
      priceUsd: 40.00, 
      priceBrl: 70.00, 
      imageUrl: 'assets/imgs/store/tee-3-a.jpg' 
    }
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.setCurrencyCode(this.translate.currentLang);

    this.translate.onLangChange.subscribe(langChangeEvent => {
      this.setCurrencyCode(langChangeEvent.lang);
    });
  }

  setCurrencyCode(lang: string) {
    this.currencyCode = (lang === 'pt') ? 'BRL' : 'USD';
  }

  getProductPrice(product: any): number {
    return this.currencyCode === 'BRL' ? product.priceBrl : product.priceUsd;
  }

}
