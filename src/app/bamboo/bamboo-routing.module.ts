import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RouteguardService } from '../share/services/routeguard.service';
import { AccountComponent } from './account/account.component';
import { OrganComponent } from './organ/organ.component';
import { SolutionComponent } from './solution/solution.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { SolutionService } from '../share/services/webapis/solution.service';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { MaterialCategoryComponent } from './material-category/material-category.component';
import { ProductGroupCategoryComponent } from './product-group-category/product-group-category.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductService } from '../share/services/webapis/product.service';
import { DemoComponent } from './demo/demo.component';
import { StaticmeshService } from '../share/services/webapis/staticmesh.service';
import { StaticMeshComponent } from './static-mesh/static-mesh.component';
import { StaticMeshDetailComponent } from './static-mesh-detail/static-mesh-detail.component';
import { MaterialComponent } from './material/material.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { MaterialService } from '../share/services/webapis/material.service';
import { MapComponent } from './map/map.component';
import { MapService } from '../share/services/webapis/map.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from '../share/services/webapis/order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductGroupDetailComponent } from './product-group-detail/product-group-detail.component';
import { ProductGroupService } from '../share/services/webapis/product-group.service';
import { AreaTypeComponent } from './area-type/area-type.component';
import { AreaTypeDetailComponent } from './area-type-detail/area-type-detail.component';
import { AreaTypeService } from '../share/services/webapis/area-type.service';
import { MediaFileComponent } from './media-file/media-file.component';
import { MediaFileDetailComponent } from './media-file-detail/media-file-detail.component';
import { MediaFileService } from '../share/services/webapis/media-file.service';
import { PackageComponent } from './package/package.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { PackageService } from '../share/services/webapis/package.service';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { ProductReplaceGroupComponent } from './product-replace-group/product-replace-group.component';
import { OrganDetailComponent } from './organ-detail/organ-detail.component';
import { OrganService } from '../share/services/webapis/organ.service';
import { RouteguardService } from '../share/services/common/routeguard.service';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountService } from '../share/services/webapis/account.service';
import { LayoutComponent } from './layout/layout.component';
import { LayoutDetailComponent } from './layout-detail/layout-detail.component';
import { LayoutService } from '../share/services/webapis/layout.service';


const routes: Routes = [
  {
    path: 'demo'
    , component: DemoComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'organ-account'
    , component: AccountComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'account-profile'
    , component: AccountProfileComponent
    , canActivate: [RouteguardService]
    , resolve: {
      entity: AccountService
    }
  }
  , { path: 'product-category', component: ProductCategoryComponent, canActivate: [RouteguardService] }
  , { path: 'material-category', component: MaterialCategoryComponent, canActivate: [RouteguardService] }
  , { path: 'product-group-category', component: ProductGroupCategoryComponent, canActivate: [RouteguardService] }
  /****************************************************************************************************/
  , {
    path: 'organ'
    , component: OrganComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'organ-detail/:id'
    , component: OrganDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: OrganService
    }
  }
  , {
    path: 'organ-detail'
    , component: OrganDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: OrganService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'solutions'
    , component: SolutionComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'solution-detail/:id'
    , component: SolutionDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: SolutionService
    }
  }
  , {
    path: 'solution-detail'
    , component: SolutionDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: SolutionService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'products'
    , component: ProductComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'product-detail/:id'
    , component: ProductDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: ProductService
    }
  }
  , {
    path: 'product-detail'
    , component: ProductDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: ProductService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'staticmeshs'
    , component: StaticMeshComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'staticmesh-detail/:id'
    , component: StaticMeshDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: StaticmeshService
    }
  }
  , {
    path: 'staticmesh-detail'
    , component: StaticMeshDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: StaticmeshService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'materials'
    , component: MaterialComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'material-detail/:id'
    , component: MaterialDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: MaterialService
    }
  }
  , {
    path: 'material-detail'
    , component: MaterialDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: MaterialService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'maps'
    , component: MapComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'map-detail/:id'
    , component: MapDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: MapService
    }
  }
  , {
    path: 'map-detail'
    , component: MapDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: MapService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'orders'
    , component: OrderComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'order-detail/:id'
    , component: OrderDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: OrderService
    }
  }
  , {
    path: 'order-detail'
    , component: OrderDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: OrderService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'product-group'
    , component: ProductGroupComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'product-group-detail/:id'
    , component: ProductGroupDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: ProductGroupService
    }
  }
  , {
    path: 'product-group-detail'
    , component: ProductGroupDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: ProductGroupService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'area-type'
    , component: AreaTypeComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'area-type-detail/:id'
    , component: AreaTypeDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: AreaTypeService
    }
  }
  , {
    path: 'area-type-detail'
    , component: AreaTypeDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: AreaTypeService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'shares'
    , component: MediaFileComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'share-detail/:id'
    , component: MediaFileDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: MediaFileService
    }
  }
  , {
    path: 'share-detail'
    , component: MediaFileDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: MediaFileService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'packages'
    , component: PackageComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'package-detail/:id'
    , component: PackageDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: PackageService
    }
  }
  , {
    path: 'package-detail'
    , component: PackageDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: PackageService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'product-replace-group'
    , component: ProductReplaceGroupComponent
    , canActivate: [RouteguardService]
  }
  /****************************************************************************************************/
  , {
    path: 'layout'
    , component: LayoutComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'layout-detail/:id'
    , component: LayoutDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: LayoutService
    }
  }
  , {
    path: 'layout-detail'
    , component: LayoutDetailComponent
    , canActivate: [RouteguardService],
    resolve: {
      entity: LayoutService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BambooRoutingModule { }
