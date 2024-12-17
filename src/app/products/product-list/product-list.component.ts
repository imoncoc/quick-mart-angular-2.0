import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: 'Flex Tripod',
    price: '$50.48',
    image:
      'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.99,
    description: 'Worldwide shifting available Buyers protection possible!',
    stock: 10, // Assuming 10 units in stock
    available: true,
    brand: 'ABC Company',
    material: 'Aluminum',
    features: ['Lightweight', 'Portable', 'Adjustable height'],
  }));

  constructor() {}

  ngOnInit(): void {}
}
