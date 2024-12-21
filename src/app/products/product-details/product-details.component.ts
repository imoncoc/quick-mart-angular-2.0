import { Component, OnInit } from '@angular/core';
import { TProduct } from '../products.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  isAlreadyAddedIntoCart = true;
  quantity: number = 1;
  maxQuantity: number = 10;
  product: TProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Product details');
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;

      this.http
        .get<TProduct[]>('assets/data/products.json')
        .subscribe((products) => {
          this.product = products.find((p) => p.id === id);
          console.log(this.product);
        });
    });
  }

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

  // getCalculatedDiscountPrice(price: number, discount: number): number {
  //   let discountedPrice = price - (price * discount) / 100;

  //   return parseFloat(discountedPrice.toFixed(2));
  // }

  addToCart(product: TProduct, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
}
