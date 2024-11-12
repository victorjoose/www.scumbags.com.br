import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  comingSoon = true;

  products = [
    { nameKey: 'SCUMSTORE.RAT_ABDUCTION', price: 25.00, imageUrl: 'assets/imgs/store/tee-1-a.jpg' },
    { nameKey: 'SCUMSTORE.RAT_OVERLAY_RED', price: 28.00, imageUrl: 'assets/imgs/store/tee-2-a.jpg' },
    { nameKey: 'SCUMSTORE.RAT_OVERLAY_BLACK', price: 30.00, imageUrl: 'assets/imgs/store/tee-3-a.jpg' }
  ];

  constructor(public translate: TranslateService) {}
}
