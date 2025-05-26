import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TestTranslateModule } from 'tests/test-translate.module';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [TestTranslateModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar preço BRL se currencyCode for BRL', () => {
    const product = { priceBrl: 100, priceUsd: 20 };
    component.currencyCode = 'BRL';
    expect(component.getProductPrice(product)).toBe(100);
  });

  it('deve retornar preço USD se currencyCode for USD', () => {
    const product = { priceBrl: 100, priceUsd: 20 };
    component.currencyCode = 'USD';
    expect(component.getProductPrice(product)).toBe(20);
  });

  it('deve navegar para o produto correto ao clicar', () => {
    component.navigateToProduct(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/store'], { queryParams: { product: 2 } });
  });

  it('deve renderizar todos os produtos quando comingSoon for false', () => {
    component.comingSoon = false;
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(productCards.length).toBe(component.products.length);
  });

  it('deve renderizar mensagem "coming soon" quando comingSoon for true', () => {
    component.comingSoon = true;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.store-title'));
    expect(title.nativeElement.textContent).toContain('SCUMSTORE');
  });
});
