import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from '../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any;
  subtotal: number = 0;
  shippingPrice: number = 5;
  totalPrice: number = 0;
  constructor(
    private title: Title,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Cart');

    console.log(this.cartService.getCartItems());
    this.cartItems = this.cartService.getCartItems();
    this.subtotal = this.cartService.calculateTotalPrice();
    this.totalPrice = this.cartService.calculateTotalPrice();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculatePrices();
  }

  shadowLevel: number = 4;

  get boxShadow(): string {
    return `0px ${this.shadowLevel}px ${
      this.shadowLevel * 2
    }px rgba(0, 0, 0, 0.1)`;
  }

  increaseShadow(): void {
    if (this.shadowLevel < 20) {
      this.shadowLevel += 2;
    }
  }

  decreaseShadow(): void {
    if (this.shadowLevel > 0) {
      this.shadowLevel -= 2;
    }
  }

  onViewCartItem(id: number) {
    this.router.navigate(['/products', id]);
  }

  removeItemFromCart(id: number) {
    console.log('removeItemFromCart clicked');
    this.cartService.removeFromCart(id);
    this.loadCart();
  }

  increaseCartItemQuantity(id: number) {
    this.cartService.increaseQuantity(id);
    this.calculatePrices();
  }
  decreaseCartItemQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
    this.calculatePrices();
  }

  calculatePrices(): void {
    this.subtotal = this.cartService.calculateTotalPrice();
    this.totalPrice = this.subtotal + this.shippingPrice;
  }
  trackById(index: number, item: any): number {
    return item.id;  // Track by the unique 'id' of the item
  }
}
