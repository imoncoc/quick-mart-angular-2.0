import { Component, OnInit } from '@angular/core';
import { TProduct } from '../products.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  isAlreadyAddedIntoCart = true;
  quantity: number = 1;
  maxQuantity: number = 10;
  product: TProduct = {
    id: 1,
    title: 'Flex Tripod',
    price: 50.48,
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

  onAddToCart() {
    this.isAlreadyAddedIntoCart = !this.isAlreadyAddedIntoCart;
  }

  incrementQuantity(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getCalculatedDiscountPrice(price: number, discount: number): number {
    let discountedPrice = price - (price * discount) / 100;

    return parseFloat(discountedPrice.toFixed(2));
  }
}
