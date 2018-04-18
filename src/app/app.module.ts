import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { ServicesModule } from './main/content/services/services.module';
import { MarkdownModule } from 'angular2-markdown';
import { TranslateModule } from '@ngx-translate/core';
import { RouteGuardService } from './main/content/services/routeguard.service';
// import { AuthService } from './main/content/services/auth.service';
import { ConfigService } from './main/content/services/config.service';
import { DataService } from './main/content/services/data.service';
import { BambooModule } from "./main/content/bamboo/bamboo.module";
const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'app/dashboard'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, { enableTracing: false }),
        SharedModule,
        MarkdownModule.forRoot(),
        TranslateModule.forRoot(),
        BambooModule,
        FuseMainModule,
        ServicesModule
    ],
    providers: [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        RouteGuardService,
        ConfigService,
        DataService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
