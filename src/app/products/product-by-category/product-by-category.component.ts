import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

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

  selectedCategory: string = 'All Categories'; // Default category
  isDropdownVisible: boolean = false;
  isLargeScreen: boolean = window.innerWidth > 1024; // Check if screen size is larger than 1024px

  constructor() {}

  ngOnInit(): void {}

  // Handle screen size changes for responsiveness
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = event.target.innerWidth > 1024;
    if (this.isLargeScreen) {
      this.isDropdownVisible = true; // Always show categories on larger screens
    }
  }

  toggleCategoryDropdown(): void {
    if (!this.isLargeScreen) {
      this.isDropdownVisible = !this.isDropdownVisible; // Toggle for smaller screens
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.isDropdownVisible = false; // Close the dropdown after selection
    this.categorySelected.emit(category === 'All Categories' ? null : category); // Emit null for 'All Categories'
    // console.log('Selected Category:', category);
  }

  onSortChange(event: any): void {
    const sortOrder = event.target.value;
    this.sortByPrice.emit(sortOrder); // Emit the sort order to the parent
  }
}
