import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    // Limpa localStorage antes de cada teste
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve iniciar com carrinho vazio se localStorage estiver vazio', () => {
    expect(service.getItems()).toEqual([]);
  });

  it('deve adicionar item ao carrinho e persistir no localStorage', () => {
    const product = { nameKey: 'CAMISETA_PRETA', priceBrl: 50 };
    service.addToCart(product, 'M');

    const items = service.getItems();
    expect(items.length).toBe(1);
    expect(items[0].nameKey).toBe('CAMISETA_PRETA');
    expect(items[0].size).toBe('M');

    const saved = JSON.parse(localStorage.getItem('scumstore_cart') || '[]');
    expect(saved.length).toBe(1);
  });

  it('deve remover item do carrinho e atualizar localStorage', () => {
    const product = { nameKey: 'BONÉ', priceBrl: 30 };
    service.addToCart(product, 'G');

    let items = service.getItems();
    expect(items.length).toBe(1);

    service.removeItem(0);

    items = service.getItems();
    expect(items.length).toBe(0);

    const saved = JSON.parse(localStorage.getItem('scumstore_cart') || '[]');
    expect(saved.length).toBe(0);
  });

  it('deve limpar completamente o carrinho', () => {
    service.addToCart({ nameKey: 'ADESIVO', priceBrl: 5 }, 'U');
    expect(service.getItems().length).toBe(1);

    service.clearCart();

    expect(service.getItems()).toEqual([]);
    const saved = JSON.parse(localStorage.getItem('scumstore_cart') || '[]');
    expect(saved).toEqual([]);
  });
});
