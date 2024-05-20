import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';

export const headerRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'upload', component: FileUploadComponent },
  {
    path: 'product',
    loadChildren: () => import('src/app/e-commerce/e-commerce.module').then(module => module.ECommerceModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(headerRoutes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
