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
import { ListBsModelService } from './share/services/webapis/list-bs-model.service';
import { V1ListComponent } from './main/dynamic/v1-list/v1-list.component';




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
    , component: V1ListComponent
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
    AppComponent, HomeComponent, ToolBarComponent, LoginComponent, NavComponent, RouterLinkComponent, V1ListComponent
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
