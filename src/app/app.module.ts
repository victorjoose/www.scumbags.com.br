import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LandingComponent } from './components/landing/landing.component';
import { TourComponent } from './components/tour/tour.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { ScumstoreComponent } from './pages/scumstore/scumstore.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ToastComponent } from './components/toast/toast.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'store', component: ScumstoreComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    FooterComponent,
    LandingComponent,
    TourComponent,
    ContactComponent,
    HomeComponent,
    ScumstoreComponent,
    ProductModalComponent,
    CheckoutComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }