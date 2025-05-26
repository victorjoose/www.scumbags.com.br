import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-scumstore',
  templateUrl: './scumstore.component.html',
  styleUrls: ['./scumstore.component.css']
})
export class ScumstoreComponent {
  selectedProductId: number | null = null;
  showModal = false;
  currencyCode = 'BRL'
  products = [
    { 
      id: 1,
      nameKey: 'SCUMSTORE.RAT_ABDUCTION',
      priceUsd: 45.00, 
      priceBrl: 90.00, 
      imageUrl: 'assets/imgs/store/tee-1-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-1-b.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      stock: { S: 2, M: 0, L: 3, XL: 0 }
    },
    { 
      id: 2,
      nameKey: 'SCUMSTORE.RAT_OVERLAY_RED',
      priceUsd: 40.00, 
      priceBrl: 70.00, 
      imageUrl: 'assets/imgs/store/tee-2-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-2-b.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      stock: { S: 0, M: 0, L: 0, XL: 0 } // esgotado
    },
    { 
      id: 3,
      nameKey: 'SCUMSTORE.RAT_OVERLAY_BLACK',
      priceUsd: 40.00, 
      priceBrl: 70.00, 
      imageUrl: 'assets/imgs/store/tee-3-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-3-b.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      stock: { S: 3, M: 2, L: 0, XL: 1 }
    }
  ];

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.setCurrencyCode(this.translate.currentLang);
    this.translate.onLangChange.subscribe(langChangeEvent => {
      this.setCurrencyCode(langChangeEvent.lang);
    });

    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.selectedProductId = Number(params['product']);
        this.showModal = true;
      }
    });
  }

   setCurrencyCode(lang: string) {
    this.currencyCode = (lang === 'pt') ? 'BRL' : 'USD';
  }

  getProductPrice(product: any): number {
    return this.currencyCode === 'BRL' ? product.priceBrl : product.priceUsd;
  }

  getSelectedProduct() {
    return this.products.find(p => p.id === this.selectedProductId);
  }

  openProductModal(productId: number) {
    this.selectedProductId = productId;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProductId = null;
  }
}
