import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseConfigServiceDocsComponent } from './config/config.component';
import { FuseSplashScreenServiceDocsComponent } from './splash-screen/splash-screen.component';
import { AppServiceModule } from "../../toolkit/server/app.service.module";
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
        SharedModule,
        AppServiceModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        FuseConfigServiceDocsComponent,
        FuseSplashScreenServiceDocsComponent,
    ]
})
export class ServicesModule {
}
