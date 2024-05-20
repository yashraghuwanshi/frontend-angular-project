import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductSearchComponent } from './product-search/product-search.component';

 export const routes: Routes = [
  {
    path: '', component: ProductComponent,
    children: [
      {
        path: 'product-list', component: ProductListComponent,
        children: [
          {
            path: 'detail/:id', component: ProductDetailsComponent
          }, {
            path: 'update/:id', component: ProductUpdateComponent
          }
        ]
      }, 
      {
        path: 'product-registration', component: ProductRegistrationComponent
      },
      {
        path: 'product-search', component: ProductSearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
