import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
const routes: Routes = [
  { path: 'app/products', component: ProductComponent }
  , { path: 'app/product-detail', component: ProductDetailComponent }
  , { path: 'app/dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BambooRoutingModule { }
