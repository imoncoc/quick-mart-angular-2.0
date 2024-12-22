import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TProduct } from '../products.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, debounceTime, of, switchMap } from 'rxjs';

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
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Products');

    // Fetch products and apply the category filter if needed
    this.http.get<TProduct[]>('assets/data/products.json').subscribe(
      (data) => {
        this.allProducts = data;

        // Get the category from query parameters and filter the products
        const categoryFromUrl =
          this.route.snapshot.queryParamMap.get('category');
        this.filterProductsByCategory(categoryFromUrl);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );

    // Watch for changes in query parameters and update the filter
    // Watch for changes in query parameters and update the filter
    this.route.queryParams.subscribe((params) => {
      const category = params['category'] || null;
      this.filterProductsByCategory(category);
      this.searchTerm = params['searchTerm'] || ''; // Set the search term from query params
      this.searchSubject.next(this.searchTerm); // Trigger search immediately if the search term is present
    });

    // Debounced search logic
    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((term) => this.searchProducts(term))
      )
      .subscribe((filtered) => {
        this.filteredProducts = filtered;
        this.products = filtered;
      });
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

  filterProductsByCategory(category: string | null): void {
    if (category) {
      this.products = this.allProducts.filter(
        (product) => product.category === category
      );
    } else if (category === 'All Categories') {
      this.products = [...this.allProducts];
    } else {
      // Reset to all products when no category is selected
      this.products = [...this.allProducts];
    }
  }

  // Handle category selection
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
    return of(filtered); // Return the filtered products as an observable
  }

  // Handle search input change
  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge', // Retain other query parameters (like category)
    });
    this.searchSubject.next(searchTerm); // Trigger search
  }
}
