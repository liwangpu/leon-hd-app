import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './main/login/login.component';
import { HomeComponent } from './main/home/home.component';
import { ToolBarComponent } from './main/tool-bar/tool-bar.component';
import { NavComponent } from './main/nav/nav.component';
import { RouterLinkComponent } from './main/nav/router-link/router-link.component';
import { RouteguardService } from './share/services/common/routeguard.service';
import { V1ListPageComponent } from './main/dynamic/v1-list-page/v1-list-page.component';
import { ListBsModelService } from './share/services/webapis/list-bs-model.service';
import { OContentComponent as V1ListOContentComponent } from './main/dynamic/v1-list-page/o-content/o-content.component';
import { PTableListComponent as V1ListOContentPTableListComponent  } from './main/dynamic/v1-list-page/o-content/p-table-list/p-table-list.component';
import { PLitimgListComponent as V1ListOContentPLitimgListComponent } from './main/dynamic/v1-list-page/o-content/p-litimg-list/p-litimg-list.component';
import { OPaginatorBarComponent  as V1ListOPaginatorBarComponent} from './main/dynamic/v1-list-page/o-paginator-bar/o-paginator-bar.component';


const routes: Routes = [
  {
    path: ''
    , component: HomeComponent
    , canActivate: [RouteguardService]
  }
  , {
    path: 'login'
    , component: LoginComponent
  }
  // , {
  //   path: 'designer'
  //   , loadChildren: './designer/designer.module#DesignerModule'
  // }
  , {
    path: 'app'
    , loadChildren: './bamboo/bamboo.module#BambooModule'
  }
  , {
    path: 'v1/list/:model'
    , component: V1ListPageComponent
    , canActivate: [RouteguardService],
    resolve: {
      model: ListBsModelService
    }
  }
  , { path: '**', redirectTo: '' }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ToolBarComponent, LoginComponent, NavComponent, RouterLinkComponent, V1ListPageComponent, V1ListOContentComponent, V1ListOContentPTableListComponent, V1ListOContentPLitimgListComponent, V1ListOPaginatorBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ShareModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RouterLinkComponent
  ]
})
export class AppModule { }
