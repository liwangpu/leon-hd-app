import { NgModule } from '@angular/core';
import { DmzOmsRoutingModule } from './dmz-oms-routing.module';
import { ScaffoldNgBclModule } from '@geek/scaffold-ng-bcl';
import { TranslateModule } from '@ngx-translate/core';
import { ScaffoldMatBclModule } from '@geek/scaffold-mat-bcl';
import { TreeModule } from 'ng2-tree';
import { ScaffoldAppMinorModule } from '@geek/scaffold-app-minor';
import { ScaffoldPagePlateModule } from '@geek/scaffold-page-plate';
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
  declarations: [MemberRegistryComponent, MemberRegistryDetailComponent, MemberRegistryDetailBasicEditorExComponent, MemberHierarchyParamComponent, MemberHierarchyParamDetailComponent, MemberHierarchyParamSettingExComponent, MemberComponent, MemberDetailComponent, MemberDetailBasicEditorExComponent, MemberDetailHierarchyEditorComponent]
})
export class DmzOmsModule { }
