import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Cart');
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
}
