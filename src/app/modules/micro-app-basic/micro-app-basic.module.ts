import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { NavService } from './services/nav.service';
import { AccountService } from './services/account.service';
import { TokenService } from './services/token.service';
import { UserNavService } from './services/user-nav.service';
import { UserRoleService } from './services/user-role.service';
import { WorkFlowService } from './services/work-flow.service';
import { WorkFlowRuleService } from './services/work-flow-rule.service';
import { OrganizationService } from './services/organization.service';
import { DepartmentService } from './services/department.service';
import { OrganizationTypeService } from './services/organization-type.service';
import { FileService } from './services/file.service';


@NgModule({
  imports: [
  ],
  providers: [
    NavService,
    AccountService,
    TokenService,
    UserNavService,
    UserRoleService,
    WorkFlowService,
    WorkFlowRuleService,
    OrganizationService,
    DepartmentService,
    OrganizationTypeService,
    FileService
  ]
})
export class MicroAppBasicModule {
  constructor(@Optional() @SkipSelf() parentModule: MicroAppBasicModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MicroAppBasicModule
    };
  }//forRoot
}
