import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  loginForm!: FormGroup;
  subtotal: number = 0;
  shippingPrice: number = 5;
  private authSubscription: Subscription | null = null;

  constructor(
    private cartService: CartService,
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    });

    this.subtotal = this.cartService.calculateTotalPrice();
    this.title.setTitle('Quick Mart | Checkout');

    this.authSubscription = this.authService
      .getCredentialsObservable()
      .subscribe((userData) => {
        if (userData) {
          this.loginForm.patchValue({
            fullname: userData.fullname || '',
            email: userData.email || '',
          });
        }
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRemoveAllTheCartsItem() {
    this.cartService.emptyCartsItem();
  }
  onPlaceYourOrder() {
    if (this.loginForm.valid) {
      this.router.navigate(['/cart/payment-success']);
      this.cartService.emptyCartsItem();
    } else {
      this.loginForm.markAllAsTouched();
      this.toastService.show('Please fill the form first!', 'warn');
    }
  }
}
