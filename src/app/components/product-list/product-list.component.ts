import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  comingSoon = false;
  currencyCode = 'BRL'
  products = [
    { 
      id: 1,
      nameKey: 'SCUMSTORE.RAT_ABDUCTION',
      priceUsd: 45.00, 
      priceBrl: 90.00, 
      imageUrl: 'assets/imgs/store/tee-1-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-1-b.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 2,
      nameKey: 'SCUMSTORE.RAT_OVERLAY_RED',
      priceUsd: 40.00, 
      priceBrl: 70.00, 
      imageUrl: 'assets/imgs/store/tee-2-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-2-b.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 3,
      nameKey: 'SCUMSTORE.RAT_OVERLAY_BLACK',
      priceUsd: 40.00, 
      priceBrl: 70.00, 
      imageUrl: 'assets/imgs/store/tee-3-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-3-b.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ];

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    this.setCurrencyCode(this.translate.currentLang);
    this.translate.onLangChange.subscribe(event => {
    this.setCurrencyCode(event.lang);
  });
  }

  setCurrencyCode(lang: string) {
  this.currencyCode = lang === 'pt' ? 'BRL' : 'USD';
}

  getProductPrice(product: any): number {
    return this.currencyCode === 'BRL' ? product.priceBrl : product.priceUsd;
  }

  navigateToProduct(productId: number) {
    this.router.navigate(['/store'], { queryParams: { product: productId } });
  }
}