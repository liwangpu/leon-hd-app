import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticmeshComponent } from './components/staticmesh/staticmesh.component';
import { StaticmeshDetailComponent } from './components/staticmesh-detail/staticmesh-detail.component';
import { MapComponent } from './components/map/map.component';
import { MapDetailComponent } from './components/map-detail/map-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutDetailComponent } from './components/layout-detail/layout-detail.component';
import { SolutionComponent } from './components/solution/solution.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { AreaTypeComponent } from './components/area-type/area-type.component';
import { AreaTypeDetailComponent } from './components/area-type-detail/area-type-detail.component';
import { MediaFileComponent } from './components/media-file/media-file.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialComponent } from './components/material/material.component';
import { ProductionCategoryComponent } from './components/production-category/production-category.component';
import { MaterialCategoryComponent } from './components/material-category/material-category.component';
import { ProductGroupCategoryComponent } from './components/product-group-category/product-group-category.component';
import { PackageComponent } from './components/package/package.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { ProductGroupComponent } from './components/product-group/product-group.component';
import { ProductGroupDetailComponent } from './components/product-group-detail/product-group-detail.component';

const routes: Routes = [
  {
    path: 'staticmesh'
    , component: StaticmeshComponent
  }
  , {
    path: 'staticmesh-detail/:id'
    , component: StaticmeshDetailComponent
  }
  , {
    path: 'staticmesh-detail'
    , component: StaticmeshDetailComponent
  }
  , {
    path: 'map'
    , component: MapComponent
  }
  , {
    path: 'map-detail/:id'
    , component: MapDetailComponent
  }
  , {
    path: 'map-detail'
    , component: MapDetailComponent
  }
  , {
    path: 'layout'
    , component: LayoutComponent
  }
  , {
    path: 'layout-detail/:id'
    , component: LayoutDetailComponent
  }
  , {
    path: 'layout-detail'
    , component: LayoutDetailComponent
  }
  , {
    path: 'solution'
    , component: SolutionComponent
  }
  , {
    path: 'solution-detail/:id'
    , component: SolutionDetailComponent
  }
  , {
    path: 'solution-detail'
    , component: SolutionDetailComponent
  }
  , {
    path: 'order'
    , component: OrderComponent
  }
  , {
    path: 'order-detail/:id'
    , component: OrderDetailComponent
  }
  , {
    path: 'order-detail'
    , component: OrderDetailComponent
  }
  , {
    path: 'area-type'
    , component: AreaTypeComponent
  }
  , {
    path: 'area-type-detail/:id'
    , component: AreaTypeDetailComponent
  }
  , {
    path: 'area-type-detail'
    , component: AreaTypeDetailComponent
  }
  , {
    path: 'share'
    , component: MediaFileComponent
  }
  , {
    path: 'product'
    , component: ProductComponent
  }
  , {
    path: 'product-detail/:id'
    , component: ProductDetailComponent
  }
  , {
    path: 'product-detail'
    , component: ProductDetailComponent
  }
  , {
    path: 'material'
    , component: MaterialComponent
  }
  , {
    path: 'material-detail/:id'
    , component: MaterialDetailComponent
  }
  , {
    path: 'material-detail'
    , component: MaterialDetailComponent
  }
  , {
    path: 'product-category'
    , component: ProductionCategoryComponent
  }
  , {
    path: 'material-category'
    , component: MaterialCategoryComponent
  }
  , {
    path: 'product-group-category'
    , component: ProductGroupCategoryComponent
  }
  , {
    path: 'package'
    , component: PackageComponent
  }
  , {
    path: 'package-detail/:id'
    , component: PackageDetailComponent
  }
  , {
    path: 'package-detail'
    , component: PackageDetailComponent
  }
  , {
    path: 'product-group'
    , component: ProductGroupComponent
  }
  , {
    path: 'product-group-detail/:id'
    , component: ProductGroupDetailComponent
  }
  , {
    path: 'product-group-detail'
    , component: ProductGroupDetailComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmzHdRoutingModule { }
