import { NgModule } from '@angular/core';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { OrganizationDetailBasicEditorExComponent } from './components/organization-detail/organization-detail-basic-editor-ex/organization-detail-basic-editor-ex.component';
import { OrganizationOwnerProfileComponent } from './components/organization/organization-owner-profile/organization-owner-profile.component';
import { WorkFlowDetailFlowItemComponent } from './components/work-flow-detail/work-flow-detail-flow-item/work-flow-detail-flow-item.component';
import { WorkFlowRuleComponent } from './components/work-flow-rule/work-flow-rule.component';
import { WorkFlowRuleDetailComponent } from './components/work-flow-rule-detail/work-flow-rule-detail.component';
import { WorkFlowRuleDetailBasicEditorExComponent } from './components/work-flow-rule-detail/work-flow-rule-detail-basic-editor-ex/work-flow-rule-detail-basic-editor-ex.component';
import { WorkFlowRuleDetailDefineEditorComponent } from './components/work-flow-rule-detail/work-flow-rule-detail-define-editor/work-flow-rule-detail-define-editor.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { UserRoleDetailComponent } from './components/user-role-detail/user-role-detail.component';
import { WorkFlowComponent } from './components/work-flow/work-flow.component';
import { WorkFlowDetailComponent } from './components/work-flow-detail/work-flow-detail.component';
import { WorkFlowDetailBasicEditorExComponent } from './components/work-flow-detail/work-flow-detail-basic-editor-ex/work-flow-detail-basic-editor-ex.component';
import { WorkFlowDetailFlowDesignerComponent } from './components/work-flow-detail/work-flow-detail-flow-designer/work-flow-detail-flow-designer.component';
import { WorkFlowDetailFlowFormComponent } from './components/work-flow-detail/work-flow-detail-flow-form/work-flow-detail-flow-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ScaffoldNgBclModule } from 'scaffold-ng-bcl';
import { TranslateModule } from '@ngx-translate/core';
import { ScaffoldMatBclModule } from 'scaffold-mat-bcl';
import { ScaffoldPagePlateModule } from 'scaffold-page-plate';
import { AppBasicRoutingModule } from './app-basic-routing.module';
import { ScaffoldAppMinorModule } from 'scaffold-app-minor';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountDetailBasicEditorExComponent } from './components/account-detail/account-detail-basic-editor-ex/account-detail-basic-editor-ex.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { AccountDetailRoleEditorComponent } from './components/account-detail/account-detail-role-editor/account-detail-role-editor.component';
import { ProfileBasicEditorExComponent } from './components/profile/profile-basic-editor-ex/profile-basic-editor-ex.component';
import { OrganizationDetailOwnerEditorComponent } from './components/organization-detail/organization-detail-owner-editor/organization-detail-owner-editor.component';
import { OrganizationTypeComponent } from './components/organization-type/organization-type.component';
import { OrganizationTypeDetailComponent } from './components/organization-type-detail/organization-type-detail.component';
import { OrganizationDetailOwnerResetpasswordFormComponent } from './components/organization-detail/organization-detail-owner-resetpassword-form/organization-detail-owner-resetpassword-form.component';
import { AccountDetailRoleFormComponent } from './components/account-detail/account-detail-role-form/account-detail-role-form.component';
import { AccountDetailResetpwdFormComponent } from './components/account-detail/account-detail-resetpwd-form/account-detail-resetpwd-form.component';
import { ProfileChangePasswordFormComponent } from './components/profile/profile-change-password-form/profile-change-password-form.component';
import { ProfileMemberInviteFormComponent } from './components/profile/profile-member-invite-form/profile-member-invite-form.component';

@NgModule({
  imports: [
    ScaffoldNgBclModule,
    TranslateModule,
    ScaffoldMatBclModule,
    ScaffoldAppMinorModule,
    ScaffoldPagePlateModule,
    AppBasicRoutingModule
  ],
  declarations: [
    OrganizationComponent, OrganizationDetailComponent, OrganizationDetailBasicEditorExComponent, OrganizationOwnerProfileComponent, UserRoleComponent, UserRoleDetailComponent, WorkFlowComponent, WorkFlowDetailComponent, WorkFlowDetailBasicEditorExComponent, WorkFlowDetailFlowDesignerComponent, WorkFlowDetailFlowFormComponent, WorkFlowDetailFlowItemComponent, WorkFlowRuleComponent, WorkFlowRuleDetailComponent, WorkFlowRuleDetailBasicEditorExComponent, WorkFlowRuleDetailDefineEditorComponent, ProfileComponent, AccountComponent, AccountDetailComponent, AccountDetailBasicEditorExComponent, DepartmentComponent, DepartmentDetailComponent, AccountDetailRoleEditorComponent, ProfileBasicEditorExComponent, OrganizationDetailOwnerEditorComponent, OrganizationTypeComponent, OrganizationTypeDetailComponent, OrganizationDetailOwnerResetpasswordFormComponent, AccountDetailRoleFormComponent, AccountDetailResetpwdFormComponent, ProfileChangePasswordFormComponent, ProfileMemberInviteFormComponent
  ],
  entryComponents: [
    OrganizationOwnerProfileComponent,
    WorkFlowDetailFlowFormComponent,
    OrganizationDetailOwnerResetpasswordFormComponent,
    AccountDetailRoleFormComponent,
    AccountDetailResetpwdFormComponent,
    ProfileChangePasswordFormComponent,
    ProfileMemberInviteFormComponent
  ]
})
export class AppBasicModule { }
