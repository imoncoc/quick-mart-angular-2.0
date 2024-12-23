import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TProduct } from 'src/app/products/products.interface';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss'],
})
export class TopProductsComponent implements OnInit {
  allProducts: TProduct[] = [];

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.http.get<TProduct[]>('assets/data/products.json').subscribe(
      (data) => {
        this.allProducts = data;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

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

  goToDetailPage(id: number) {
    this.router.navigate(['products', id]);
  }


  addToCart(product: TProduct) {
    this.cartService.addToCart(product);
  }
}
