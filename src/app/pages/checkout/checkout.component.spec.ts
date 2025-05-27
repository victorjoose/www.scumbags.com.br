import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CartService } from 'src/app/services/cart.service';
import { TestTranslateModule } from 'tests/test-translate.module';


describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockCartService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockCartService = {
      getItems: jasmine.createSpy('getItems').and.returnValue([
        { priceBrl: 50, priceUsd: 10, size: 'M' },
        { priceBrl: 100, priceUsd: 20, size: 'G' }
      ]),
      removeItem: jasmine.createSpy('removeItem'),
      clearCart: jasmine.createSpy('clearCart')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [FormsModule, TestTranslateModule],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar itens do carrinho e calcular o total em BRL', () => {
    expect(component.cartItems.length).toBe(2);
    expect(component.total).toBe(150); // 50 + 100
  });

  it('deve calcular o total corretamente em USD', () => {
    component.currencyCode = 'USD';
    component.calculateTotal();
    expect(component.total).toBe(30); // 10 + 20
  });

  it('deve remover item do carrinho e recalcular o total', () => {
    mockCartService.getItems.and.returnValue([{ priceBrl: 100, priceUsd: 20, size: 'G' }]);
    component.removeItem(0);
    expect(mockCartService.removeItem).toHaveBeenCalledWith(0);
    expect(component.cartItems.length).toBe(1);
    expect(component.total).toBe(100);
  });

  it('deve invalidar formulário com campos vazios', () => {
    spyOn(window, 'alert');
    component.buyer.name = '';
    const isValid = component.isFormValid();
    expect(isValid).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios.');
  });

  it('deve validar corretamente e enviar pedido se os dados estiverem válidos', () => {
    spyOn(console, 'log');
    component.buyer = {
      name: 'João',
      email: 'joao@email.com',
      street: 'Rua X',
      city: 'Joinville',
      state: 'SC',
      zip: '89200-000',
      cardNumber: '1234567812345678',
      cardName: 'João',
      expiry: '12/25',
      cvv: '123'
    };

    component.submitCheckout();

    expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching('✅ Pedido realizado'), jasmine.any(Object));
    expect(mockCartService.clearCart).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
