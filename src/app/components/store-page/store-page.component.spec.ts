import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorePageComponent } from './store-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TestTranslateModule } from 'tests/test-translate.module';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

describe('StorePageComponent', () => {
  let component: StorePageComponent;
  let fixture: ComponentFixture<StorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [StorePageComponent, ProductModalComponent, FooterComponent],
        imports: [TestTranslateModule, FormsModule],
        providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal with correct product ID when openProductModal is called', () => {
    component.openProductModal(2);
    expect(component.selectedProductId).toBe(2);
    expect(component.showModal).toBeTrue();
  });

  it('should close the modal and reset selectedProductId', () => {
    component.openProductModal(1);
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.selectedProductId).toBeNull();
  });

  it('should return the correct selected product', () => {
    component.selectedProductId = 3;
    const product = component.getSelectedProduct();
    expect(product).toBeDefined();
    expect(product?.id).toBe(3);
  });

  it('should open modal on init if product query param is present', () => {
    const fakeRoute = TestBed.inject(ActivatedRoute);
    (fakeRoute.queryParams as any) = of({ product: 1 });

    const newFixture = TestBed.createComponent(StorePageComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.selectedProductId).toBe(1);
    expect(newComponent.showModal).toBeTrue();
  });
});
