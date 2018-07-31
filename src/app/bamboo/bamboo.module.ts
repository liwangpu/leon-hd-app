import { NgModule } from '@angular/core';
import { BambooRoutingModule } from './bamboo-routing.module';
import { ShareModule } from '../share/share.module';
import { OrganComponent } from './organ/organ.component';
import { AccountComponent } from './account/account.component';
import { SolutionComponent } from './solution/solution.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { MaterialCategoryComponent } from './material-category/material-category.component';
import { ProductGroupCategoryComponent } from './product-group-category/product-group-category.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductBasicInfoExComponent } from './product-detail/product-basic-info-ex/product-basic-info-ex.component';
import { DemoComponent } from './demo/demo.component';
import { StaticMeshComponent } from './static-mesh/static-mesh.component';
import { StaticMeshDetailComponent } from './static-mesh-detail/static-mesh-detail.component';
import { MaterialComponent } from './material/material.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { MaterialBasicInfoExComponent } from './material-detail/material-basic-info-ex/material-basic-info-ex.component';
import { MapComponent } from './map/map.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductGroupDetailComponent } from './product-group-detail/product-group-detail.component';
import { ProductGroupDetailBasicInfoExComponent } from './product-group-detail/product-group-detail-basic-info-ex/product-group-detail-basic-info-ex.component';
import { AreaTypeComponent } from './area-type/area-type.component';
import { AreaTypeDetailComponent } from './area-type-detail/area-type-detail.component';
import { MediaFileComponent } from './media-file/media-file.component';
import { MediaFileDetailComponent } from './media-file-detail/media-file-detail.component';
import { ShareManageTapComponent } from './media-file-detail/share-manage-tap/share-manage-tap.component';
import { ShareEditItemComponent } from './media-file-detail/share-edit-item/share-edit-item.component';
import { PackageComponent } from './package/package.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { DetailContentExComponent as PackageDetailContentExComponent } from './package-detail/detail-content-ex/detail-content-ex.component';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { AreaTypePanelComponent } from './package-detail/area-type-panel/area-type-panel.component';
import { AreaTypePanelDirective } from './package-detail/area-type-panel/area-type-panel.directive';
import { AreaTypePanelEditComponent } from './package-detail/area-type-panel-edit/area-type-panel-edit.component';
import { ProductReplaceGroupComponent } from './product-replace-group/product-replace-group.component';
import { DetailContentListComponent as PackageDetailDetailContentListComponent } from './package-detail/detail-content-list/detail-content-list.component';
import { XProductGroupComponent as PackageDetailXProductGroupComponent } from './package-detail/detail-content-list/x-product-group/x-product-group.component';
import { YEditFormComponent as PackageDetailProductGroupYEditFormComponent } from './package-detail/detail-content-list/x-product-group/y-edit-form/y-edit-form.component';
import { XCategoryProductComponent as PackageDetailXCategoryProductComponent } from './package-detail/detail-content-list/x-category-product/x-category-product.component';
import { YEditFormComponent as PackageDetailXCategoryProductYEditFormComponent } from './package-detail/detail-content-list/x-category-product/y-edit-form/y-edit-form.component';
import { YListItemComponent as PackageDetailXCommonYListItemComponent } from './package-detail/detail-content-list/x-common/y-list-item/y-list-item.component';
import { XMaterialComponent as PackageDetailXMaterialComponent } from './package-detail/detail-content-list/x-material/x-material.component';
import { YEditFormComponent as PackageDetailXMaterialYEditFormComponent } from './package-detail/detail-content-list/x-material/y-edit-form/y-edit-form.component';
import { YListItemComponent as PackageDetailXMaterialYListItemComponent } from './package-detail/detail-content-list/x-material/y-list-item/y-list-item.component';
import { XReplaceGroupComponent as PackageDetailXReplaceGroupComponent } from './package-detail/detail-content-list/x-replace-group/x-replace-group.component';
import { XDetailComponent as AccountXDetailComponent } from './account/x-detail/x-detail.component';
import { XEditFormComponent as ProductReplaceGroupXEditFormComponent } from './product-replace-group/x-edit-form/x-edit-form.component';
import { YEditFormComponent as PackageDetailXReplaceGroupYEditFormComponent } from './package-detail/detail-content-list/x-replace-group/y-edit-form/y-edit-form.component';
import { YSimpleListComponent as PackageDetailXReplaceGroupYSimpleListComponent } from './package-detail/detail-content-list/x-replace-group/y-simple-list/y-simple-list.component';
import { YSimpleListItemComponent as PackageDetailXReplaceGroupYSimpleListItemComponent } from './package-detail/detail-content-list/x-replace-group/y-simple-list-item/y-simple-list-item.component';
import { OrganDetailComponent } from './organ-detail/organ-detail.component';
import { XBasicInfoTabComponent as OrganDetailXBasicInfoTabComponent } from './organ-detail/x-basic-info-tab/x-basic-info-tab.component';
import { XDepartmentFormComponent as AccountXDepartmentFormComponent } from './account/x-department-form/x-department-form.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { OBasicInfoComponent as AccountProfileOBasicInfoComponent } from './account-profile/o-basic-info/o-basic-info.component';
import { OChangePasswordComponent as AccountProfileOChangePasswordComponent } from './account-profile/o-change-password/o-change-password.component';
import { OPriceRateSettingComponent as ProductOPriceRateSettingComponent } from './product/o-price-rate-setting/o-price-rate-setting.component';


@NgModule({
  imports: [
    ShareModule,
    BambooRoutingModule
  ],
  declarations: [OrganComponent, AccountComponent, SolutionComponent, SolutionDetailComponent, ProductCategoryComponent, MaterialCategoryComponent, ProductGroupCategoryComponent, ProductComponent, ProductDetailComponent, ProductBasicInfoExComponent, DemoComponent, StaticMeshComponent, StaticMeshDetailComponent, MaterialComponent, MaterialDetailComponent, MaterialBasicInfoExComponent, MapComponent, OrderComponent, OrderDetailComponent, ProductGroupComponent, ProductGroupDetailComponent, ProductGroupDetailBasicInfoExComponent, AreaTypeComponent, AreaTypeDetailComponent, MediaFileComponent, MediaFileDetailComponent, ShareManageTapComponent, ShareEditItemComponent, PackageComponent, PackageDetailComponent, PackageDetailContentExComponent, MapDetailComponent, AreaTypePanelComponent, AreaTypePanelDirective, AreaTypePanelEditComponent, ProductReplaceGroupComponent, PackageDetailDetailContentListComponent, PackageDetailXProductGroupComponent, PackageDetailProductGroupYEditFormComponent, PackageDetailXCategoryProductComponent, PackageDetailXCategoryProductYEditFormComponent, PackageDetailXCommonYListItemComponent, PackageDetailXMaterialComponent, PackageDetailXMaterialYEditFormComponent, PackageDetailXMaterialYListItemComponent, PackageDetailXReplaceGroupComponent, AccountXDetailComponent, ProductReplaceGroupXEditFormComponent, PackageDetailXReplaceGroupYEditFormComponent, PackageDetailXReplaceGroupYSimpleListComponent, PackageDetailXReplaceGroupYSimpleListItemComponent, OrganDetailComponent, OrganDetailXBasicInfoTabComponent, AccountXDepartmentFormComponent, AccountProfileComponent, AccountProfileOBasicInfoComponent, AccountProfileOChangePasswordComponent, ProductOPriceRateSettingComponent],
  providers: [
  ]
  , entryComponents: [
    AreaTypePanelEditComponent,
    PackageDetailProductGroupYEditFormComponent,
    PackageDetailXCategoryProductYEditFormComponent,
    PackageDetailXMaterialYEditFormComponent,
    ProductReplaceGroupXEditFormComponent,
    PackageDetailXReplaceGroupYEditFormComponent,
    AccountXDepartmentFormComponent,
    AccountXDetailComponent,
    AccountProfileOChangePasswordComponent,
    ProductOPriceRateSettingComponent
  ]
})
export class BambooModule { }
