import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
// import { AccountService } from '@app/app-legacy/services/webapis/account.service';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { MaterialCategoryComponent } from './components/material-category/material-category.component';
import { ProductGroupCategoryComponent } from './components/product-group-category/product-group-category.component';
// import { OrganService } from '@app/app-legacy/services/webapis/organ.service';
import { ProductService, MaterialService, ProductGroupService, MediaFileService, PackageService } from '@app/app-legacy';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MaterialComponent } from './components/material/material.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { ProductGroupComponent } from './components/product-group/product-group.component';
import { ProductGroupDetailComponent } from './components/product-group-detail/product-group-detail.component';
import { MediaFileDetailComponent } from './components/media-file-detail/media-file-detail.component';
import { PackageComponent } from './components/package/package.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { ProductReplaceGroupComponent } from './components/product-replace-group/product-replace-group.component';



const routes: Routes = [
  { path: 'product-category', component: ProductCategoryComponent }
  , { path: 'material-category', component: MaterialCategoryComponent }
  , { path: 'product-group-category', component: ProductGroupCategoryComponent }
  /****************************************************************************************************/
  , {
    path: 'product'
    , component: ProductComponent
  }
  , {
    path: 'product-detail/:id'
    , component: ProductDetailComponent
    , resolve: {
      entity: ProductService
    }
  }
  , {
    path: 'product-detail'
    , component: ProductDetailComponent
    , resolve: {
      entity: ProductService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'material'
    , component: MaterialComponent
  }
  , {
    path: 'material-detail/:id'
    , component: MaterialDetailComponent
    , resolve: {
      entity: MaterialService
    }
  }
  , {
    path: 'material-detail'
    , component: MaterialDetailComponent
    , resolve: {
      entity: MaterialService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'product-group'
    , component: ProductGroupComponent
  }
  , {
    path: 'product-group-detail/:id'
    , component: ProductGroupDetailComponent
    , resolve: {
      entity: ProductGroupService
    }
  }
  , {
    path: 'product-group-detail'
    , component: ProductGroupDetailComponent
    , resolve: {
      entity: ProductGroupService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'share-detail/:id'
    , component: MediaFileDetailComponent
    , resolve: {
      entity: MediaFileService
    }
  }
  , {
    path: 'share-detail'
    , component: MediaFileDetailComponent
    , resolve: {
      entity: MediaFileService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'package'
    , component: PackageComponent
  }
  , {
    path: 'package-detail/:id'
    , component: PackageDetailComponent
    , resolve: {
      entity: PackageService
    }
  }
  , {
    path: 'package-detail'
    , component: PackageDetailComponent
    , resolve: {
      entity: PackageService
    }
  }
  /****************************************************************************************************/
  , {
    path: 'product-replace-group'
    , component: ProductReplaceGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BambooLegacyRoutingModule { }
