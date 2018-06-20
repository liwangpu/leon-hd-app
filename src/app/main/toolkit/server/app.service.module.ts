import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './webapi/auth.service';
import { ProductService } from './webapi/product.service';
import { AccountService } from './webapi/account.service';
import { ProductSpecService } from './webapi/productSpec.service';
import { ErrorService } from './webapi/error.service';
import { StaticmeshService } from './webapi/staticmesh.service';
import { FileAssetService } from "./webapi/fileasset.service";
import { MaterialService } from './webapi/material.service';
import { ChartletService } from './webapi/chartlet.service';
import { ConfigModule } from "../config/config.module";
import { OrganService } from "./webapi/organ.service";
import { DepartmentService } from "./webapi/department.service";
import { SolutionService } from "./webapi/solution.service";
import { ProductCategoryService } from "./webapi/productcategory.service";
import { IconService } from "./webapi/icon.service";
import { ProductspecCategoryService } from "./webapi/productspec-category.service";
import { OrderService } from "./webapi/order.service";
import { PackageService } from "./webapi/package.service";
import { MapService } from "./webapi/map.service";
import { MaterialCategoryService } from './webapi/material-category.service';
import { LayoutService } from './webapi/layout.service';
import { MediaFileService } from './webapi/media-file.service';
import { MediaShareService } from './webapi/media-share.service';
import { AreaTypeService } from './webapi/area-type.service';
import { ProductGroupService } from './webapi/product-group.service';
import { ProductgroupCategoryService } from './webapi/productgroup-category.service';
@NgModule({
    imports: [
        ConfigModule
        , HttpClientModule
        , RouterModule
    ],
    providers: [
        ProductService
        , ProductSpecService
        , AuthService
        , AccountService
        , OrganService
        , StaticmeshService
        , FileAssetService
        , MaterialService
        , ErrorService
        , ChartletService
        , DepartmentService
        , SolutionService
        , ProductCategoryService
        , IconService
        , ProductspecCategoryService
        , OrderService
        , PackageService
        , MapService
        , LayoutService
        , MaterialCategoryService
        , MediaFileService
        , MediaShareService
        , AreaTypeService
        , ProductGroupService
        , ProductgroupCategoryService
        , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
        , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class AppServiceModule {

}