import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  comingSoon = false;

  products = [
    { 
      id: 1,
      nameKey: 'SCUMSTORE.RAT_ABDUCTION',
      price: 25.00,
      imageUrl: 'assets/imgs/store/tee-1-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-1-b.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 2,
      nameKey: 'SCUMSTORE.RAT_OVERLAY_RED',
      price: 28.00,
      imageUrl: 'assets/imgs/store/tee-2-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-2-b.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 3,
      nameKey: 'SCUMSTORE.RAT_OVERLAY_BLACK',
      price: 30.00,
      imageUrl: 'assets/imgs/store/tee-3-a.jpg',
      imageUrl2: 'assets/imgs/store/tee-3-b.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ];

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {}

  navigateToProduct(productId: number) {
    this.router.navigate(['/scumstore'], { queryParams: { product: productId } });
  }
}