import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  loginForm!: FormGroup;
  subtotal: number = 0;
  shippingPrice: number = 5;

  constructor(private cartService: CartService, private title: Title) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    });

    this.subtotal = this.cartService.calculateTotalPrice();
    this.title.setTitle('Quick Mart | Checkout');
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
}
