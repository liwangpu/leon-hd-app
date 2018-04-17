import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './webapi/auth.service';
import { ProductService } from './webapi/product.service';
import { ConfigService } from './config.service';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from './webapi/account.service';
import { ProductSpecService } from './webapi/productSpec.service';
import { ErrorService } from './webapi/error.service';
import { StaticmeshService } from './webapi/staticmesh.service';
import { FileAssetService } from "./webapi/fileasset.service";
import { MaterialService } from './webapi/material.service';
import { ChartletService } from './webapi/chartlet.service';
@NgModule({
    imports: [
        HttpClientModule
        , RouterModule
        , TranslateModule.forRoot()
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        , ProductService
        , ProductSpecService
        , ConfigService
        , AuthService
        , AccountService
        , StaticmeshService
        , FileAssetService
        , MaterialService
        , ChartletService
    ]
})
export class AppServiceModule {

}