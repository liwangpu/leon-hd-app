import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { AreaTypeService } from './services/area-type.service';
import { LayoutService } from './services/layout.service';
import { MapService } from './services/map.service';
import { MaterialCategoryService } from './services/material-category.service';
import { MaterialService } from './services/material.service';
import { MediaFileService } from './services/media-file.service';
import { MediaShareService } from './services/media-share.service';
import { ProductCategoryService } from './services/product-category.service';
import { ProductService } from './services/product.service';
import { SolutionService } from './services/solution.service';
import { StaticmeshService } from './services/staticmesh.service';
import { ProductSpecService } from './services/product-spec.service';
import { ProductGroupCategoryService } from './services/product-group-category.service';
import { PackageService } from './services/package.service';
import { ProductGroupService } from './services/product-group.service';

@NgModule({
  providers: [
    AreaTypeService,
    LayoutService,
    MapService,
    MaterialCategoryService,
    MaterialService,
    MediaFileService,
    MediaShareService,
    ProductCategoryService,
    ProductService,
    PackageService,
    SolutionService,
    StaticmeshService,
    ProductSpecService,
    ProductGroupService,
    ProductGroupCategoryService
  ]
})
export class MicroDmzHdModule {
  constructor(@Optional() @SkipSelf() parentModule: MicroDmzHdModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MicroDmzHdModule
    };
  }//forRoot
}
