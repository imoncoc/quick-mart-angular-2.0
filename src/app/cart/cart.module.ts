import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent, ConfirmPaymentComponent],
  imports: [CommonModule, CartRoutingModule, ReactiveFormsModule],
})
export class CartModule {}
