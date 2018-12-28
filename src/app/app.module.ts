import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScaffoldAppCoreModule, AuthInterceptorService, ErrorInterceptorService } from '@geek/scaffold-app-core';
import { ScaffoldAppMinorModule } from '@geek/scaffold-app-minor';
import { ScaffoldPagePlateModule } from '@geek/scaffold-page-plate';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MicroAppBasicModule } from '@geek/micro-app-basic';
import { MicroDmzHdModule } from '@geek/micro-dmz-hd';
import { AppMainModule } from './modules/app-main/app-main.module';
import {HotkeyModule} from 'angular2-hotkeys';
import { MicroDmzOmsModule } from '@geek/micro-dmz-oms';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
]; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
    HotkeyModule.forRoot(),
    AppMainModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
