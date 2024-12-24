import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss'],
})
export class ProductByCategoryComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<string | null>();
  @Output() sortByPrice = new EventEmitter<string>();
  categories: string[] = [
    'Electronics',
    'Accessories',
    'Wearables',
    'Fitness',
    'Outdoor',
    'Kitchen',
    'Footwear',
    'Drones',
    'Storage',
    'Lighting',
  ];

  selectedCategory: string = 'All Categories';
  isDropdownVisible: boolean = false;
  isLargeScreen: boolean = window.innerWidth > 1024;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      if (category && this.categories.includes(category)) {
        this.selectedCategory = category;
      } else {
        this.selectedCategory = 'All Categories';
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = event.target.innerWidth > 1024;
    if (this.isLargeScreen) {
      this.isDropdownVisible = true;
    }
  }

  toggleCategoryDropdown(): void {
    if (!this.isLargeScreen) {
      this.isDropdownVisible = !this.isDropdownVisible;
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.isDropdownVisible = false;
    this.categorySelected.emit(category === 'All Categories' ? null : category);
    console.log('Selected Category:', category);
  }

  onSortChange(event: any): void {
    const sortOrder = event.target.value;
    this.sortByPrice.emit(sortOrder);
  }

  onCategoryDropdownChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.selectCategory(selectedCategory);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
