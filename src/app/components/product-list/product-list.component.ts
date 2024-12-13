import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  comingSoon = false;

  products = [
    { nameKey: 'SCUMSTORE.RAT_ABDUCTION', price: 90.00, imageUrl: 'assets/imgs/store/tee-1-a.jpg' },
    { nameKey: 'SCUMSTORE.RAT_OVERLAY_RED', price: 70.00, imageUrl: 'assets/imgs/store/tee-2-a.jpg' },
    { nameKey: 'SCUMSTORE.RAT_OVERLAY_BLACK', price: 70.00, imageUrl: 'assets/imgs/store/tee-3-a.jpg' }
  ];

  constructor(public translate: TranslateService) {}
}
