import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TProduct } from '../products.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: TProduct[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1, // Assuming 'i' is already declared as the index
    title: 'Flex Tripod',
    price: 50.48,
    price_off: 12,
    image:
      'https://plus.unsplash.com/premium_photo-1710409625188-d34e3e813f6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.99,
    reviews: 149,
    description: 'Worldwide shipping available. Buyers protection possible!',
    stock: 10, // Units in stock
    available: true,
    brand: 'ABC Company',
    material: 'Aluminum',
    features: ['Lightweight', 'Portable', 'Adjustable height'],
    category: 'Tripods', // Added category
  }));

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onDetailsPage(id: number) {
    this.router.navigate(['products', id]);
  }

  getCalculatedDiscountPrice(price: number, discount: number): number {
    let discountedPrice = price - (price * discount) / 100;

    return parseFloat(discountedPrice.toFixed(2));
  }
}
