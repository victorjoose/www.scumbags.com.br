import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductModalComponent } from './product-modal.component';
import { CartService } from 'src/app/services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TestTranslateModule } from 'tests/test-translate.module';

describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let translateServiceMock: any;

  const mockProduct = {
    nameKey: 'CAMISETA_PRETA',
    imageUrl: 'https://example.com/img1.jpg',
    imageUrl2: 'https://example.com/img2.jpg',
    priceBrl: 50,
    priceUsd: 10,
    stock: {
      S: 0,
      M: 2,
      G: 0
    },
    sizes: ['S', 'M', 'G']
  };

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    translateServiceMock = {
      currentLang: 'pt',
      onLangChange: of({ lang: 'en' })
    };

    await TestBed.configureTestingModule({
      declarations: [ProductModalComponent],
      imports: [TestTranslateModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: TranslateService, useValue: translateServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentImage with product.imageUrl', () => {
    expect(component.currentImage).toBe(mockProduct.imageUrl);
  });

  it('should toggle image when toggleImage() is called', () => {
    component.toggleImage();
    expect(component.currentImage).toBe(mockProduct.imageUrl2);
    component.toggleImage();
    expect(component.currentImage).toBe(mockProduct.imageUrl);
  });

  it('should emit close event when closeModal() is called', () => {
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should return BRL price if language is pt', () => {
    component.currencyCode = 'BRL';
    expect(component.getProductPrice()).toBe(mockProduct.priceBrl);
  });

  it('should return USD price if language is en', () => {
    component.currencyCode = 'USD';
    expect(component.getProductPrice()).toBe(mockProduct.priceUsd);
  });

  it('should identify product as in stock', () => {
    expect(component.hasAvailableStock(mockProduct)).toBeTrue();
  });

  it('should NOT call addToCart if no size is selected', () => {
    component.selectedSize = '';
    component.addToCart();
    expect(cartServiceSpy.addToCart).not.toHaveBeenCalled();
  });

  it('should call addToCart and close modal when size is selected', () => {
    component.selectedSize = 'M';
    spyOn(component.toast, 'show');
    spyOn(component, 'closeModal');

    component.addToCart();

    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProduct, 'M');
    expect(component.toast.show).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  });
});
