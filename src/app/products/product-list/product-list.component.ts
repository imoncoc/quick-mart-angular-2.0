import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TProduct } from '../products.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: TProduct[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Products');
    this.http.get<TProduct[]>('assets/data/products.json').subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  onDetailsPage(id: number) {
    this.router.navigate(['products', id]);
  }

  // getCalculatedDiscountPrice(price: number, discount: number): number {
  //   let discountedPrice = price - (price * discount) / 100;

  //   return parseFloat(discountedPrice.toFixed(2));
  // }

  getStarsArray(rating: number) {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 !== 0; // Check for half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return {
      fullStars: Array(fullStars).fill(0),
      halfStar,
      emptyStars: Array(emptyStars).fill(0),
    };
  }

  addToCart(product: TProduct, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
}
