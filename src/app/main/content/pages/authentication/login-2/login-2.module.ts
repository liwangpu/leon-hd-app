import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseLogin2Component } from './login-2.component';
import { AppServiceModule } from "../../../../toolkit/server/app.service.module";
const routes = [
    {
        path: 'pages/auth/login-2',
        component: FuseLogin2Component
    }
];

@NgModule({
    declarations: [
        FuseLogin2Component
    ],
    imports: [
        AppServiceModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class Login2Module {

}
