import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TourComponent } from './components/tour/tour.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, HeaderComponent, FooterComponent, LandingComponent, ProductListComponent, TourComponent],
    imports: [TestTranslateModule, FormsModule, RouterTestingModule]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'scumbags'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('scumbags');
  });

  it('should have title property set to "scumbags"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  expect(app.title).toBe('scumbags');
});
});
