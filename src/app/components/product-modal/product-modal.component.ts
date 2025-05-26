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
  selectedSize: string = '';
  currentImage: string = '';
  currencyCode: string = 'BRL';
  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private cartService: CartService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (this.product) {
      this.currentImage = this.product.imageUrl;
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

  addToCart() {
    if (this.selectedSize) {
      this.cartService.addToCart(this.product, this.selectedSize);
      this.toast?.show('Item adicionado ao carrinho!');
      this.closeModal();
    }
  }
}
