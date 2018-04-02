import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseFaq2Component } from './faq2.component';
import { Faq2Service } from './faq2.service';
import { RouteGuardService } from '../../services/routeguard.service';

const routes = [
    {
        path     : 'pages/faq2',
        component: FuseFaq2Component,
        canActivate: [RouteGuardService],
        resolve  : {
            faq: Faq2Service
        }
    }
];

@NgModule({
    declarations: [
        FuseFaq2Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
        Faq2Service
    ]
})
export class Faq2Module
{
}
