import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseConfigServiceDocsComponent } from './config/config.component';
import { FuseSplashScreenServiceDocsComponent } from './splash-screen/splash-screen.component';
import { AppServiceModule } from "../../toolkit/server/app.service.module";
import { RouteGuardService } from "./routeguard.service";
import { LocalStoreService } from "./localstore.service";
import { DessertService } from "./dessert.service";
import { TranslateService } from '@ngx-translate/core';
import { ConfigModule } from "../../toolkit/config/config.module";
import { PathService } from "./path.service";
import { AsyncHandleService } from './async-handle.service';

const routes = [
    {
        path: 'services/config',
        component: FuseConfigServiceDocsComponent
    },
    {
        path: 'services/splash-screen',
        component: FuseSplashScreenServiceDocsComponent
    }
];

@NgModule({
    imports: [
        ConfigModule,
        SharedModule,
        AppServiceModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        RouteGuardService,
        LocalStoreService,
        DessertService,
        TranslateService,
        PathService,
        AsyncHandleService
    ],
    declarations: [
        FuseConfigServiceDocsComponent,
        FuseSplashScreenServiceDocsComponent,
    ]
})
export class ServicesModule {
}
