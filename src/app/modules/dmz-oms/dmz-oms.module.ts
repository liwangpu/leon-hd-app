import { NgModule } from '@angular/core';
import { DmzOmsRoutingModule } from './dmz-oms-routing.module';
import { ScaffoldNgBclModule } from 'scaffold-ng-bcl';
import { TranslateModule } from '@ngx-translate/core';
import { ScaffoldMatBclModule } from 'scaffold-mat-bcl';
import { TreeModule } from 'ng2-tree';
import { ScaffoldAppMinorModule } from 'scaffold-app-minor';
import { ScaffoldPagePlateModule } from 'scaffold-page-plate';
import { MemberRegistryComponent } from './components/member-registry/member-registry.component';
import { MemberRegistryDetailComponent } from './components/member-registry-detail/member-registry-detail.component';
import { MemberRegistryDetailBasicEditorExComponent } from './components/member-registry-detail/member-registry-detail-basic-editor-ex/member-registry-detail-basic-editor-ex.component';
import { MemberHierarchyParamComponent } from './components/member-hierarchy-param/member-hierarchy-param.component';
import { MemberHierarchyParamDetailComponent } from './components/member-hierarchy-param-detail/member-hierarchy-param-detail.component';
import { MemberHierarchyParamSettingExComponent } from './components/member-hierarchy-param-detail/member-hierarchy-param-setting-ex/member-hierarchy-param-setting-ex.component';
import { MemberComponent } from './components/member/member.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberDetailBasicEditorExComponent } from './components/member-detail/member-detail-basic-editor-ex/member-detail-basic-editor-ex.component';
import { MemberDetailHierarchyEditorComponent } from './components/member-detail/member-detail-hierarchy-editor/member-detail-hierarchy-editor.component';
import { NationalUrbanSelectComponent } from './components/common/national-urban-select/national-urban-select.component';
import { PointExchangeRadioSettingComponent } from './components/member-hierarchy-param/point-exchange-radio-setting/point-exchange-radio-setting.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderDetailListEditorComponent } from './components/order-detail/order-detail-list-editor/order-detail-list-editor.component';
import { OrderDetailWorkflowEditorComponent } from './components/order-detail/order-detail-workflow-editor/order-detail-workflow-editor.component';
import { OrderDetailFlowRejectFormComponent } from './components/order-detail/order-detail-flow-reject-form/order-detail-flow-reject-form.component';
import { OrderDetailCustomerEditorComponent } from './components/order-detail/order-detail-customer-editor/order-detail-customer-editor.component';
import { OrderDetailListItemFormComponent } from './components/order-detail/order-detail-list-item-form/order-detail-list-item-form.component';
import { OrderDetailBasicEditorComponent } from './components/order-detail/order-detail-basic-editor/order-detail-basic-editor.component';

@NgModule({
  imports: [
    ScaffoldNgBclModule,
    TranslateModule,
    ScaffoldMatBclModule,
    TreeModule,
    ScaffoldAppMinorModule,
    ScaffoldPagePlateModule,
    DmzOmsRoutingModule
  ],
  declarations: [MemberRegistryComponent, MemberRegistryDetailComponent, MemberRegistryDetailBasicEditorExComponent, MemberHierarchyParamComponent, MemberHierarchyParamDetailComponent, MemberHierarchyParamSettingExComponent, MemberComponent, MemberDetailComponent, MemberDetailBasicEditorExComponent, MemberDetailHierarchyEditorComponent, NationalUrbanSelectComponent, PointExchangeRadioSettingComponent, OrderComponent, OrderDetailComponent, OrderDetailListEditorComponent, OrderDetailWorkflowEditorComponent, OrderDetailFlowRejectFormComponent, OrderDetailCustomerEditorComponent, OrderDetailListItemFormComponent, OrderDetailBasicEditorComponent],
  entryComponents: [
    PointExchangeRadioSettingComponent
    , OrderDetailFlowRejectFormComponent
    , OrderDetailListItemFormComponent
  ]
})
export class DmzOmsModule { }
