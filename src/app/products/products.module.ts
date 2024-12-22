import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent, ProductByCategoryComponent],
  imports: [CommonModule, ProductsRoutingModule, HttpClientModule, FormsModule],
})
export class ProductsModule {}
