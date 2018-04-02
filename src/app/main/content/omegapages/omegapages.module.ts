import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { OmegaPage1Component } from './page1.component';
import { OmegaPage2Component } from './page2.component';

const routes = [
    {
        path     : 'omega/page1',
        component: OmegaPage1Component
    },
    {
        path: 'omega/page2',
        component: OmegaPage2Component
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule
    ],
    declarations: [
        OmegaPage1Component,
        OmegaPage2Component
    ]
})
export class OmegaPagesModule
{
}
