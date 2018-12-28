import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { MemberRegistryService } from './services/member-registry.service';
import { MemberHierarchyParamService } from './services/member-hierarchy-param.service';
import { MemberService } from './services/member.service';


@NgModule({
  providers: [
    MemberRegistryService,
    MemberHierarchyParamService,
    MemberService
  ]
})
export class MicroDmzOmsModule {
  constructor(@Optional() @SkipSelf() parentModule: MicroDmzOmsModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MicroDmzOmsModule
    };
  }//forRoot
}
