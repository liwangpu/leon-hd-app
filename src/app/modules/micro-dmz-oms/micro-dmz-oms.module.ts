import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { MemberRegistryService } from './services/member-registry.service';
import { MemberHierarchyParamService } from './services/member-hierarchy-param.service';
import { MemberService } from './services/member.service';
import { NationalUrbanService } from './services/national-urban.service';
import { OrderService } from './services/order.service';
import { ProductPackageService } from './services/product-package.service';

@NgModule({
  providers: [
    MemberRegistryService,
    MemberHierarchyParamService,
    NationalUrbanService,
    MemberService,
    OrderService,
    ProductPackageService
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
