import { NgModule } from '@angular/core';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { MaterialCategoryComponent } from './components/material-category/material-category.component';
import { ProductGroupCategoryComponent } from './components/product-group-category/product-group-category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductBasicInfoExComponent } from './components/product-detail/product-basic-info-ex/product-basic-info-ex.component';
import { MaterialComponent } from './components/material/material.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialBasicInfoExComponent } from './components/material-detail/material-basic-info-ex/material-basic-info-ex.component';
import { ProductGroupComponent } from './components/product-group/product-group.component';
import { ProductGroupDetailComponent } from './components/product-group-detail/product-group-detail.component';
import { ProductGroupDetailBasicInfoExComponent } from './components/product-group-detail/product-group-detail-basic-info-ex/product-group-detail-basic-info-ex.component';
import { MediaFileDetailComponent } from './components/media-file-detail/media-file-detail.component';
import { ShareManageTapComponent } from './components/media-file-detail/share-manage-tap/share-manage-tap.component';
import { ShareEditItemComponent } from './components/media-file-detail/share-edit-item/share-edit-item.component';
import { PackageComponent } from './components/package/package.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { DetailContentExComponent as PackageDetailContentExComponent } from './components/package-detail/detail-content-ex/detail-content-ex.component';
import { AreaTypePanelComponent } from './components/package-detail/area-type-panel/area-type-panel.component';
import { AreaTypePanelDirective } from './components/package-detail/area-type-panel/area-type-panel.directive';
import { AreaTypePanelEditComponent } from './components/package-detail/area-type-panel-edit/area-type-panel-edit.component';
import { ProductReplaceGroupComponent } from './components/product-replace-group/product-replace-group.component';
import { DetailContentListComponent as PackageDetailDetailContentListComponent } from './components/package-detail/detail-content-list/detail-content-list.component';
import { XProductGroupComponent as PackageDetailXProductGroupComponent } from './components/package-detail/detail-content-list/x-product-group/x-product-group.component';
import { YEditFormComponent as PackageDetailProductGroupYEditFormComponent } from './components/package-detail/detail-content-list/x-product-group/y-edit-form/y-edit-form.component';
import { XCategoryProductComponent as PackageDetailXCategoryProductComponent } from './components/package-detail/detail-content-list/x-category-product/x-category-product.component';
import { YEditFormComponent as PackageDetailXCategoryProductYEditFormComponent } from './components/package-detail/detail-content-list/x-category-product/y-edit-form/y-edit-form.component';
import { YListItemComponent as PackageDetailXCommonYListItemComponent } from './components/package-detail/detail-content-list/x-common/y-list-item/y-list-item.component';
import { XMaterialComponent as PackageDetailXMaterialComponent } from './components/package-detail/detail-content-list/x-material/x-material.component';
import { YEditFormComponent as PackageDetailXMaterialYEditFormComponent } from './components/package-detail/detail-content-list/x-material/y-edit-form/y-edit-form.component';
import { YListItemComponent as PackageDetailXMaterialYListItemComponent } from './components/package-detail/detail-content-list/x-material/y-list-item/y-list-item.component';
import { XReplaceGroupComponent as PackageDetailXReplaceGroupComponent } from './components/package-detail/detail-content-list/x-replace-group/x-replace-group.component';
import { XEditFormComponent as ProductReplaceGroupXEditFormComponent } from './components/product-replace-group/x-edit-form/x-edit-form.component';
import { YEditFormComponent as PackageDetailXReplaceGroupYEditFormComponent } from './components/package-detail/detail-content-list/x-replace-group/y-edit-form/y-edit-form.component';
import { YSimpleListComponent as PackageDetailXReplaceGroupYSimpleListComponent } from './components/package-detail/detail-content-list/x-replace-group/y-simple-list/y-simple-list.component';
import { YSimpleListItemComponent as PackageDetailXReplaceGroupYSimpleListItemComponent } from './components/package-detail/detail-content-list/x-replace-group/y-simple-list-item/y-simple-list-item.component';
import { OPriceRateSettingComponent as ProductOPriceRateSettingComponent } from './components/product/o-price-rate-setting/o-price-rate-setting.component';
import { TranslateModule } from '@ngx-translate/core';
import { BambooLegacyRoutingModule } from './bamboo-legacy-routing.module';
import { ScaffoldNgBclModule } from '@geek/scaffold-ng-bcl';
import { ScaffoldMatBclModule } from '@geek/scaffold-mat-bcl';
import { ScaffoldPagePlateModule } from '@geek/scaffold-page-plate';
import { LegacyModule } from '@app/app-legacy';


@NgModule({
  imports: [
    ScaffoldNgBclModule,
    ScaffoldMatBclModule,
    ScaffoldPagePlateModule,
    LegacyModule,
    TranslateModule,
    BambooLegacyRoutingModule
  ],
  declarations: [ProductCategoryComponent, MaterialCategoryComponent, ProductGroupCategoryComponent, ProductComponent, ProductDetailComponent, ProductBasicInfoExComponent, MaterialComponent, MaterialDetailComponent, MaterialBasicInfoExComponent, ProductGroupComponent, ProductGroupDetailComponent, ProductGroupDetailBasicInfoExComponent, MediaFileDetailComponent, ShareManageTapComponent, ShareEditItemComponent, PackageComponent, PackageDetailComponent, PackageDetailContentExComponent, AreaTypePanelComponent, AreaTypePanelDirective, AreaTypePanelEditComponent, ProductReplaceGroupComponent, PackageDetailDetailContentListComponent, PackageDetailXProductGroupComponent, PackageDetailProductGroupYEditFormComponent, PackageDetailXCategoryProductComponent, PackageDetailXCategoryProductYEditFormComponent, PackageDetailXCommonYListItemComponent, PackageDetailXMaterialComponent, PackageDetailXMaterialYEditFormComponent, PackageDetailXMaterialYListItemComponent, PackageDetailXReplaceGroupComponent, ProductReplaceGroupXEditFormComponent, PackageDetailXReplaceGroupYEditFormComponent, PackageDetailXReplaceGroupYSimpleListComponent, PackageDetailXReplaceGroupYSimpleListItemComponent,ProductOPriceRateSettingComponent],
  providers: [
  ]
  , entryComponents: [
    AreaTypePanelEditComponent,
    PackageDetailProductGroupYEditFormComponent,
    PackageDetailXCategoryProductYEditFormComponent,
    PackageDetailXMaterialYEditFormComponent,
    ProductReplaceGroupXEditFormComponent,
    PackageDetailXReplaceGroupYEditFormComponent,
    ProductOPriceRateSettingComponent
  ]
})
export class BambooLegacyModule { }
