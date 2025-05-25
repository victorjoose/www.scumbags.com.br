import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit {
  selectedProductId: number | null = null;
  showModal = false;
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.selectedProductId = Number(params['product']);
        this.showModal = true;
      }
    });
  }

  openProductModal(productId: number) {
    this.selectedProductId = productId;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProductId = null;
  }

  getSelectedProduct() {
    return this.products.find(p => p.id === this.selectedProductId);
  }
}