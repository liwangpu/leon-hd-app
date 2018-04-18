import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Login2Component } from "./login2/login2.component";
import { LoginComponent } from "./login/login.component";
import { RouteGuardService } from "../services/routeguard.service";
import { ProductService } from "../../toolkit/server/webapi/product.service";
import { OrganComponent } from './organ/organ.component';
import { OrganDetailComponent } from './organ-detail/organ-detail.component';
import { OrganService } from "../../toolkit/server/webapi/organ.service";
const routes: Routes = [
  { path: 'app/login', component: LoginComponent }
  , { path: 'app/login2', component: Login2Component }
  , { path: 'app/dashboard', component: DashboardComponent, canActivate: [RouteGuardService] }
  , { path: 'app/products', component: ProductComponent, canActivate: [RouteGuardService] }
  , { path: 'app/organ', component: OrganComponent, canActivate: [RouteGuardService] }
  , {
    path: 'app/product-detail/:id'
    , component: ProductDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: ProductService
    }
  }
  , {
    path: 'app/organ-detail/:id'
    , component: OrganDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: OrganService
    }
  }
  , { path: 'app/organ-detail', component: OrganDetailComponent, canActivate: [RouteGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BambooRoutingModule { }
