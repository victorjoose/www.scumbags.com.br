import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  currencyCode: string = 'BRL';

  buyer = {
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + this.getProductPrice(item);
    }, 0);
  }

  getProductPrice(product: any): number {
    return this.currencyCode === 'BRL' ? product.priceBrl : product.priceUsd;
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }

  submitCheckout() {
    if (!this.isFormValid()) {
      return;
    }

    const order = {
      items: this.cartItems,
      buyer: this.buyer,
      total: this.total
    };

    console.log('✅ Pedido realizado com sucesso:', order);

    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  isFormValid(): boolean {
    const {
      name, email, street, city, state, zip,
      cardNumber, cardName, expiry, cvv
    } = this.buyer;

    const requiredFields = [name, email, street, city, state, zip, cardNumber, cardName, expiry, cvv];
    if (requiredFields.some(field => !field || field.trim() === '')) {
      alert('Preencha todos os campos obrigatórios.');
      return false;
    }

    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
      alert('Número do cartão inválido. Deve conter 16 dígitos.');
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert('Data de validade inválida. Use o formato MM/AA.');
      return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      alert('CVV inválido. Deve conter 3 ou 4 dígitos.');
      return false;
    }

    if (!/^\d{5}-?\d{3}$/.test(zip)) {
      alert('CEP inválido. Use o formato 00000-000.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('E-mail inválido.');
      return false;
    }

    return true;
  }
}
