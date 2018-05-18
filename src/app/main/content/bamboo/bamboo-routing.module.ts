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
import { AccountComponent } from './account/account.component';
import { SolutionComponent } from "./solution/solution.component";
import { SolutionDetailComponent } from "./solution-detail/solution-detail.component";
import { SolutionService } from "../../toolkit/server/webapi/solution.service";
import { OrderService } from "../../toolkit/server/webapi/order.service";
import { PackageService } from "../../toolkit/server/webapi/package.service";
import { StaticmeshService } from "../../toolkit/server/webapi/staticmesh.service";
import { MaterialService } from "../../toolkit/server/webapi/material.service";
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductspecCateogoryComponent } from './productspec-cateogory/productspec-cateogory.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PackageComponent } from './package/package.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { StaticmeshComponent } from './staticmesh/staticmesh.component';
import { StaticmeshDetailComponent } from './staticmesh-detail/staticmesh-detail.component';
import { MaterialComponent } from './material/material.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { MapComponent } from './map/map.component';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { MapService } from '../../toolkit/server/webapi/map.service';


const routes: Routes = [
  { path: 'app/login', component: LoginComponent }
  , { path: 'app/login2', component: Login2Component }
  , { path: 'app/dashboard', component: DashboardComponent, canActivate: [RouteGuardService] }
  , { path: 'app/products', component: ProductComponent, canActivate: [RouteGuardService] }
  , { path: 'app/organ', component: OrganComponent, canActivate: [RouteGuardService] }
  , { path: 'app/solutions', component: SolutionComponent, canActivate: [RouteGuardService] }
  , { path: 'app/orders', component: OrderComponent, canActivate: [RouteGuardService] }
  , { path: 'app/packages', component: PackageComponent, canActivate: [RouteGuardService] }
  , { path: 'app/organ-account', component: AccountComponent, canActivate: [RouteGuardService] }
  , { path: 'app/product-category', component: ProductCategoryComponent, canActivate: [RouteGuardService] }
  , { path: 'app/productspec-category', component: ProductspecCateogoryComponent, canActivate: [RouteGuardService] }
  , { path: 'app/staticmeshs', component: StaticmeshComponent, canActivate: [RouteGuardService] }
  , { path: 'app/materials', component: MaterialComponent, canActivate: [RouteGuardService] }
  , { path: 'app/maps', component: MapComponent, canActivate: [RouteGuardService] }

  , {
    path: 'app/product-detail/:id'
    , component: ProductDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: ProductService
    }
  }
  , { path: 'app/product-detail', component: ProductDetailComponent, canActivate: [RouteGuardService] }
  , {
    path: 'app/organ-detail/:id'
    , component: OrganDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: OrganService
    }
  }
  , { path: 'app/organ-detail', component: OrganDetailComponent, canActivate: [RouteGuardService] }
  , {
    path: 'app/solution-detail/:id'
    , component: SolutionDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: SolutionService
    }
  }
  , { path: 'app/solution-detail', component: SolutionDetailComponent, canActivate: [RouteGuardService] }
  , {
    path: 'app/order-detail/:id'
    , component: OrderDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: OrderService
    }
  }
  , { path: 'app/order-detail', component: OrderDetailComponent, canActivate: [RouteGuardService] }
  , {
    path: 'app/package-detail/:id'
    , component: PackageDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: PackageService
    }
  }
  , { path: 'app/package-detail', component: PackageDetailComponent, canActivate: [RouteGuardService] }
  , {
    path: 'app/staticmesh-detail/:id'
    , component: StaticmeshDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: StaticmeshService
    }
  }
  , {
    path: 'app/material-detail/:id'
    , component: MaterialDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: MaterialService
    }
  }
  , {
    path: 'app/map-detail/:id'
    , component: MapDetailComponent
    , canActivate: [RouteGuardService],
    resolve: {
      entity: MapService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BambooRoutingModule { }
