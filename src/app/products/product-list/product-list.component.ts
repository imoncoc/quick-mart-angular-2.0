import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { TProduct } from '../products.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, debounceTime, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: TProduct[] = [];
  allProducts: TProduct[] = [];
  filteredProducts: TProduct[] = [];
  searchTerm: string = '';
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient,
    private title: Title,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Products');


    this.http.get<TProduct[]>('assets/data/products.json').subscribe(
      (data) => {
        this.allProducts = data;


        const categoryFromUrl =
          this.route.snapshot.queryParamMap.get('category');
        this.filterProductsByCategory(categoryFromUrl);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );


    this.route.queryParams.subscribe((params) => {
      const category = params['category'] || null;
      this.filterProductsByCategory(category);
      this.searchTerm = params['searchTerm'] || '';
      this.searchSubject.next(this.searchTerm);
    });


    this.searchSubject
      .pipe(
        debounceTime(500),
        switchMap((term) => {
          this.searchTerm = term;
          return this.searchProducts(term);
        })
      )
      .subscribe(() => {
        const category = this.route.snapshot.queryParamMap.get('category');
        this.filterProductsByCategory(category);
      });
  }

  onDetailsPage(id: number) {
    this.router.navigate(['products', id]);
  }



  getStarsArray(rating: number) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return {
      fullStars: Array(fullStars).fill(0),
      halfStar,
      emptyStars: Array(emptyStars).fill(0),
    };
  }

  addToCart(product: TProduct, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }

  filterProductsByCategory(category: string | null): void {
    if (category) {
      this.products = this.allProducts.filter(
        (product) =>
          product.category === category &&
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else if (category === 'All Categories') {
      this.products = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {

      this.products = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = [...this.products];
  }


  onCategorySelected(category: string | null): void {
    const queryParams = category ? { category } : {};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: category ? 'merge' : null,
    });
  }

  sortProducts(order: string): void {
    if (order === 'lowToHigh') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (order === 'highToLow') {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

  searchProducts(searchTerm: string) {
    const filtered = this.allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filtered);
  }


  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge',
    });
    this.searchSubject.next(searchTerm);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
