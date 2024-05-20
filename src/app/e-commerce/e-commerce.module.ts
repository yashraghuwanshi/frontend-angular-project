import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './e-commerce-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductRegistrationComponent,
    ProductSearchComponent,
    ProductUpdateComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ], exports: [
    ProductRegistrationComponent,
    ProductListComponent
  ]
})
export class ECommerceModule { }
