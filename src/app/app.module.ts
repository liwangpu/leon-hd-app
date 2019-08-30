import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScaffoldAppCoreModule, AuthInterceptorService, ErrorInterceptorService } from 'scaffold-app-core';
import { ScaffoldAppMinorModule } from 'scaffold-app-minor';
import { ScaffoldPagePlateModule } from 'scaffold-page-plate';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MicroAppBasicModule } from 'micro-app-basic';
import { MicroDmzHdModule } from 'micro-dmz-hd';
import { AppMainModule } from './modules/app-main/app-main.module';
import { MicroDmzOmsModule } from 'micro-dmz-oms';
import { AppConfigService } from './app-config.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
];

const appConfigInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  }
};

// const appCachInitializerFn=();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'hd-app-tool' }),
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ScaffoldAppCoreModule.forRoot(),
    ScaffoldAppMinorModule,
    ScaffoldPagePlateModule,
    MicroAppBasicModule.forRoot(),
    MicroDmzHdModule.forRoot(),
    MicroDmzOmsModule.forRoot(),
    AppMainModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
