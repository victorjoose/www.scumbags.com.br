import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() product: any;
  @Output() close = new EventEmitter<void>();
  @ViewChild('toast') toast!: ToastComponent;

  selectedSize: string = '';
  currentImage: string = '';
  currencyCode: string = 'BRL';
  availableSizes: string[] = [];

  constructor(
    private cartService: CartService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    if (this.product) {
      this.currentImage = this.product.imageUrl;
      this.availableSizes = (Object.entries(this.product.stock) as [string, number][])
        .filter(([_, qty]) => qty > 0)
        .map(([size]) => size);
    }

    this.setCurrencyCode(this.translate.currentLang);
    this.translate.onLangChange.subscribe(lang => {
      this.setCurrencyCode(lang.lang);
    });
  }

  setCurrencyCode(lang: string) {
    this.currencyCode = lang === 'pt' ? 'BRL' : 'USD';
  }

  getProductPrice(): number {
    return this.currencyCode === 'BRL' ? this.product.priceBrl : this.product.priceUsd;
  }

  closeModal() {
    this.close.emit();
  }

  toggleImage() {
    this.currentImage =
      this.currentImage === this.product.imageUrl ? this.product.imageUrl2 : this.product.imageUrl;
  }

   hasAvailableStock(product: any): boolean {
    return Object.values(product.stock as Record<string, number>).some(qty => qty > 0);
  }

  addToCart() {
    if (this.selectedSize) {
      this.cartService.addToCart(this.product, this.selectedSize);
      this.toast?.show('Item adicionado ao carrinho!');
      setTimeout(() => this.closeModal(), 1500); // pequeno delay para o toast aparecer
    }
  }
}
