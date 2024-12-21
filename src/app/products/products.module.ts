import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent],
  imports: [CommonModule, ProductsRoutingModule, HttpClientModule],
})
export class ProductsModule {}
