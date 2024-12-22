import { Injectable } from '@angular/core';
import { TProduct } from 'src/app/products/products.interface';
import { ToastService } from '../toast.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: TProduct; quantity: number }[] = JSON.parse(
    localStorage.getItem(`cart`) || '[]'
  );
  cartCount: number = this.calculateCartCount();

  onCartChange: () => void = () => {};

  constructor(
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  addToCart(product: TProduct, quantity?: number): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    const addedQuantity = quantity ?? 1;

    if (existingItem) {
      existingItem.quantity += quantity ?? 1;
      this.toastService.show(
        `${addedQuantity} more added to cart! Total quantity: ${existingItem.quantity}`,
        'success'
      );
    } else {
      this.cartItems.push({ product, quantity: quantity ?? 1 });
      this.toastService.show(`${addedQuantity} added to cart!`, 'success');
    }

    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.toastService.show(`Item removed!`, 'error');
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.updateCart();
  }

  // updateCartItem(product: TProduct, quantity: number): void {
  //   const item = this.cartItems.find(
  //     (cartItem) => cartItem.product.id === product.id
  //   );

  //   if (item) {
  //     if (quantity <= 0) {
  //       this.removeFromCart(product.id);
  //     } else {
  //       item.quantity = quantity;
  //       this.updateCart();
  //     }
  //   }
  // }

  updateCartItemQuantity(productId: number, quantity: number): void {
    const cartItem = this.cartItems.find(
      (item) => item.product.id === productId
    );
    if (cartItem) {
      cartItem.quantity = quantity;
      this.updateCart(); // Persist changes to localStorage
    }
  }

  emptyCartsItem(): void {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.cartCount = 0;
    this.onCartChange();
  }
  getCartItems(): { product: TProduct; quantity: number }[] {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartCount;
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  private updateCart(): void {
    localStorage.setItem(`cart`, JSON.stringify(this.cartItems));
    this.cartCount = this.calculateCartCount();

    if (this.onCartChange) {
      this.onCartChange();
    }
  }

  private calculateCartCount(): number {
    return this.cartItems.reduce((a, c) => a + c.quantity, 0);
  }

  increaseQuantity(productId: number): void {
    const cartItem = this.cartItems.find(
      (item) => item.product.id === productId
    );
    if (cartItem) {
      if (cartItem.quantity < Math.min(cartItem.product.stock, 10)) {
        cartItem.quantity++;
        this.toastService.show(`Quantity increased`, 'success');
        this.updateCart();
        console.log('Total price: ', this.calculateTotalPrice());
      } else if (cartItem.quantity >= 10) {
        this.toastService.show(`Cannot add more than 10 items`, 'warn');
      } else {
        this.toastService.show(`Stock limit reached`, 'warn');
      }
    }
  }

  decreaseQuantity(productId: number): void {
    const cartItem = this.cartItems.find(
      (item) => item.product.id === productId
    );
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        this.toastService.show(
          `Decreased quantity of ${cartItem.product.title}`,
          'success'
        );
        this.updateCart();
        console.log('Total price: ', this.calculateTotalPrice());
      } else {
        this.toastService.show(
          `You cannot select less than 1 quantity for ${cartItem.product.title}`,
          'warn'
        );
      }
    }
  }
}
