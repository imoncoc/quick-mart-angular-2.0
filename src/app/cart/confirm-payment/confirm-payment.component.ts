import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss'],
})
export class ConfirmPaymentComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Confirm Payment');
  }
}
