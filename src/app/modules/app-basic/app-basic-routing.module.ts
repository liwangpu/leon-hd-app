import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { UserRoleDetailComponent } from './components/user-role-detail/user-role-detail.component';
import { WorkFlowComponent } from './components/work-flow/work-flow.component';
import { WorkFlowDetailComponent } from './components/work-flow-detail/work-flow-detail.component';
import { WorkFlowRuleComponent } from './components/work-flow-rule/work-flow-rule.component';
import { WorkFlowRuleDetailComponent } from './components/work-flow-rule-detail/work-flow-rule-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { OrganizationTypeComponent } from './components/organization-type/organization-type.component';
import { OrganizationTypeDetailComponent } from './components/organization-type-detail/organization-type-detail.component';

const routes: Routes = [
  {
    path: 'profile'
    , component: ProfileComponent
  }
  , {
    path: 'organization'
    , component: OrganizationComponent
  }
  , {
    path: 'organization-detail/:id'
    , component: OrganizationDetailComponent
  }
  , {
    path: 'organization-detail'
    , component: OrganizationDetailComponent
  }
  , {
    path: 'role'
    , component: UserRoleComponent
  }
  , {
    path: 'role-detail/:id'
    , component: UserRoleDetailComponent
  }
  , {
    path: 'role-detail'
    , component: UserRoleDetailComponent
  }
  , {
    path: 'work-flow'
    , component: WorkFlowComponent
  }
  , {
    path: 'work-flow-detail/:id'
    , component: WorkFlowDetailComponent
  }
  , {
    path: 'work-flow-detail'
    , component: WorkFlowDetailComponent
  }
  , {
    path: 'work-flow-rule'
    , component: WorkFlowRuleComponent
  }
  , {
    path: 'work-flow-rule-detail/:id'
    , component: WorkFlowRuleDetailComponent
  }
  , {
    path: 'work-flow-rule-detail'
    , component: WorkFlowRuleDetailComponent
  }
  , {
    path: 'account'
    , component: AccountComponent
  }
  , {
    path: 'account-detail/:id'
    , component: AccountDetailComponent
  }
  , {
    path: 'account-detail'
    , component: AccountDetailComponent
  }
  , {
    path: 'department'
    , component: DepartmentComponent
  }
  , {
    path: 'department-detail/:id'
    , component: DepartmentDetailComponent
  }
  , {
    path: 'department-detail'
    , component: DepartmentDetailComponent
  }
  , {
    path: 'organization-type'
    , component: OrganizationTypeComponent
  }
  , {
    path: 'organization-type-detail/:id'
    , component: OrganizationTypeDetailComponent
  }
  , {
    path: 'organization-type-detail'
    , component: OrganizationTypeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBasicRoutingModule { }
