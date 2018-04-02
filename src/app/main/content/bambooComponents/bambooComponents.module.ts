import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { CommonFilterComponent } from './common/commonfilter.component';
import { PropertyPanelComponent } from './common/propertypanel.component';
import { IconItemComponent } from './common/iconitem.component';
import { PaginatorComponent } from './common/paginator.component';


const routes = [
    // {
    //     path     : 'omega/page1',
    //     component: OmegaPage1Component
    // },
    // {
    //     path: 'omega/page2',
    //     component: OmegaPage2Component
    // }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        CommonFilterComponent,
        PropertyPanelComponent,
        IconItemComponent,
        PaginatorComponent
    ],
    exports:[
        CommonFilterComponent,
        PropertyPanelComponent,
        IconItemComponent,
        PaginatorComponent
    ]
})
export class BambooComponentsModule
{
}
