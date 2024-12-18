import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product = {
    id: 1,
    title: 'Flex Tripod',
    price: '$50.48',
    price_off: 12,
    image:
      'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.99,
    reviews: 149,
    description: 'Worldwide shipping available. Buyers protection possible!',
    stock: 10,
    available: true,
    brand: 'ABC Company',
    material: 'Aluminum',
    features: ['Lightweight', 'Portable', 'Adjustable height'],
    category: 'Tripods',
  };

  constructor() {}

  ngOnInit(): void {}
}
