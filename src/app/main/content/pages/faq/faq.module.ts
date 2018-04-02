import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseFaqComponent } from './faq.component';
import { FaqService } from './faq.service';
import { RouteGuardService } from '../../services/routeguard.service';

const routes = [
    {
        path     : 'pages/faq',
        component: FuseFaqComponent,
        canActivate: [RouteGuardService],
        resolve  : {
            faq: FaqService
        }
    }
];

@NgModule({
    declarations: [
        FuseFaqComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
        FaqService
    ]
})
export class FaqModule
{
}
