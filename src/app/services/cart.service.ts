import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'scumstore_cart';
  private cartItems = new BehaviorSubject<any[]>(this.loadCart());

  cart$ = this.cartItems.asObservable();

  private loadCart(): any[] {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  private saveCart(items: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartItems.next(items);
  }

  addToCart(product: any, size: string) {
    const current = this.cartItems.getValue();
    const updated = [...current, { ...product, size }];
    this.saveCart(updated);
    console.log('✅ Item added to cart:', product.nameKey, 'Size:', size);
  }

  getItems(): any[] {
    return this.cartItems.getValue();
  }

  removeItem(index: number) {
    const current = this.cartItems.getValue();
    current.splice(index, 1);
    this.saveCart([...current]);
  }

  clearCart() {
    this.saveCart([]);
  }
}
