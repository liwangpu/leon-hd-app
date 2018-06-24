import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BambooRoutingModule } from './bamboo-routing.module';
import { ProductComponent } from './product/product.component';
import { ToolkitModule } from "../../toolkit/toolkit.module";
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../../../core/modules/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'ng2-tree';
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Login2Component } from './login2/login2.component';
import { LoginComponent } from "./login/login.component";
import { ServicesModule } from "../services/services.module";
import { OrganComponent } from './organ/organ.component';
import { OrganDetailComponent } from './organ-detail/organ-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AccountListComponent } from './account/account-list/account-list.component';
import { DepartmentFormComponent } from './account/department-form/department-form.component';
import { SolutionComponent } from './solution/solution.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DetailContentComponent as OrderDetailContentComponent } from './order-detail/detail-content/detail-content.component';
import { PackageComponent } from './package/package.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { DetailContentComponent as PacakgeDetailContentComponent } from './package-detail/detail-content/detail-content.component';
import { StaticmeshComponent } from './staticmesh/staticmesh.component';
import { StaticmeshDetailComponent } from './staticmesh-detail/staticmesh-detail.component';
import { MaterialComponent } from './material/material.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { BasicInfoComponent as MaterialBasicInfoComponent } from './material-detail/basic-info/basic-info.component';
import { MapComponent } from './map/map.component';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { MaterialCategoryComponent } from './material-category/material-category.component';
import { CategoryChangeSuitComponent as MaterialCategoryChangeSuitComponent } from './material-detail/basic-info/category-change-suit.component';
import { PaginatorCommonTplsComponent } from './common/paginator-common-tpls/paginator-common-tpls.component';
import { PagingContentComponent } from './common/paginator-common-tpls/paging-content/paging-content.component';
import { PagingBarComponent } from './common/paginator-common-tpls/paging-bar/paging-bar.component';
import { PageManageButtonComponent } from './common/paginator-common-tpls/page-manage-button/page-manage-button.component';
import { TableListContentComponent as CommonListPageTableListContentComponent } from './common/paginator-common-tpls/paging-content/table-list-content/table-list-content.component';
import { LitimgListContentComponent as CommonListPageLitimgListContentComponent } from './common/paginator-common-tpls/paging-content/litimg-list-content/litimg-list-content.component';
import { LitimgIconItemComponent } from './common/paginator-common-tpls/paging-content/litimg-list-content/litimg-icon-item/litimg-icon-item.component';
import { BatchDeleteConfirmTplsComponent as CommonListPageBatchDeleteConfirmTplsComponent } from './common/paginator-common-tpls/page-manage-button/batch-delete-confirm-tpls/batch-delete-confirm-tpls.component';
import { DetailEditTplsComponent as CommonDetailEditTplsComponent } from './common/detail-edit-tpls/detail-edit-tpls.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { DetailInfoTabComponent as CommonDetailEditTabDetailInfoTabComponent } from './common/detail-edit-tpls/detail-info-tab/detail-info-tab.component';
import { BasicInfoTabComponent as CommonDetailEditTabBasicInfoTabComponent } from './common/detail-edit-tpls/basic-info-tab/basic-info-tab.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutDetailComponent } from './layout-detail/layout-detail.component';
import { BasicInfoTabComponent as OrganDetailBasicInfoTabComponent } from './organ-detail/basic-info-tab/basic-info-tab.component';
import { AccountProfileComponent } from './account/account-profile/account-profile.component';
import { PaginatorLeftCategoryCommonTplsComponent } from './common/paginator-left-category-common-tpls/paginator-left-category-common-tpls.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BasicInfoComponent as ProductDetailBasicInfoComponent } from './product-detail/basic-info/basic-info.component';
import { CategoryChangeSuitComponent as ProdcutDetailCategoryChangeSuitComponent } from './product-detail/basic-info/category-change-suit.component';
import { SpecFormComponent as ProductDetailSpecFormComponent } from "./product-detail/spec-form/spec-form.component";
import { SpecUploadComponent as ProductDetailSpecUploadComponent } from "./product-detail/spec-upload/spec-upload.component";
import { SpecsCardComponent as ProductDetailSpecsCardComponent } from "./product-detail/specs-card/specs-card.component";
import { SpecsListComponent as ProductDetailSpecsListComponent } from "./product-detail/specs-list/specs-list.component";
import { ChangeCategorySuitComponent as ProductChangeCategorySuitComponent } from './product/change-category-suit/change-category-suit.component';
import { ChangeCategorySuitComponent as MaterialChangeCategorySuitComponent } from './material/change-category-suit/change-category-suit.component';
import { CategoryManageCommonTplsComponent } from './common/category-manage-common-tpls/category-manage-common-tpls.component';
import { MediaFileComponent } from './media-file/media-file.component';
import { MediaFileDetailComponent } from './media-file-detail/media-file-detail.component';
import { ShareManageTabComponent as MediaFileShareManageTabComponent } from './media-file-detail/share-manage-tab/share-manage-tab.component';
import { ShareEditItemComponent as MediaFileShareEditItemComponent } from './media-file-detail/share-edit-item/share-edit-item.component';
import { BlankCommonTplsComponent } from './common/blank-common-tpls/blank-common-tpls.component';
import { AreaTypeComponent as PackageDetailAreaTypeComponent } from './area-type/area-type.component';
import { AreaTypeDetailComponent as PackageDetailAreaTypeDetailComponent } from './area-type-detail/area-type-detail.component';
import { AreaTypePanelComponent as PackageDetailAreaTypePanelComponent } from './package-detail/area-type-panel/area-type-panel.component';
import { AreaTypePanelDirective as PackageDetailAreaTypePanelDirective } from './package-detail/area-type-panel/area-type-panel.directive';
import { GroupDetailListComponent as PackageDetailGroupDetailListComponent } from './package-detail/group-detail-list/group-detail-list.component';
import { AreaTypeSelectComponent as PackageDetailAreaTypeSelectComponent } from './package-detail/area-type-select/area-type-select.component';
import { GroupDetailListPanelDirective as PackageDetailGroupDetailListPanelDirective } from './package-detail/group-detail-list/group-detail-list-panel.directive';
import { CommonCardPanelComponent } from './common/common-card-panel/common-card-panel.component';
import { CommomCardItemDirective } from './common/common-card-panel/commom-card-item.directive';
import { GroupListGroupMapsComponent as PackageDetailGroupListGroupMapsComponent } from './package-detail/group-detail-list/group-list-group-maps/group-list-group-maps.component';
import { GroupListItemComponent as PackageDetailGroupListItemComponent } from './package-detail/group-detail-list/group-list-item/group-list-item.component';
import { CommonAutocompleteSearchComponent } from './common/common-autocomplete-search/common-autocomplete-search.component';
import { GroupListGroupMapsDialogTplsComponent as PackageDetailGroupListGroupMapsDialogTplsComponent } from './package-detail/group-detail-list/group-list-group-maps-dialog-tpls/group-list-group-maps-dialog-tpls.component';
import { GroupListCategoryMapsComponent as PackageDetailGroupListCategoryMapsComponent } from './package-detail/group-detail-list/group-list-category-maps/group-list-category-maps.component';
import { GroupListCategoryMapsDialogTplsComponent as PackageDetailGroupListCategoryMapsDialogTplsComponent } from './package-detail/group-detail-list/group-list-category-maps-dialog-tpls/group-list-category-maps-dialog-tpls.component';
import { GroupListMaterialMapsComponent as PackageDetailGroupListMaterialMapsComponent } from './package-detail/group-detail-list/group-list-material-maps/group-list-material-maps.component';
import { GroupListMaterialMapsDialogTplsComponent as PackageDetailGroupListMaterialMapsDialogTplsComponent } from './package-detail/group-detail-list/group-list-material-maps-dialog-tpls/group-list-material-maps-dialog-tpls.component';
import { CommonIconListComponent } from './common/common-icon-list/common-icon-list.component';
import { CommonIconItemComponent } from './common/common-icon-list/common-icon-item/common-icon-item.component';
import { CommonIconItemDirective } from './common/common-icon-list/common-icon-item/common-icon-item.directive';
import { GroupListMaterialItemComponent as PackageDetailGroupListMaterialItemComponent } from './package-detail/group-detail-list/group-list-material-item/group-list-material-item.component';
import { GroupListReplacegroupMapsComponent as PackageDetailGroupListReplacegroupMapsComponent } from './package-detail/group-detail-list/group-list-replacegroup-maps/group-list-replacegroup-maps.component';
import { GroupListReplacegroupMapsDialogTplsComponent as PackageDetailGroupListReplacegroupMapsDialogTplsComponent } from './package-detail/group-detail-list/group-list-replacegroup-maps-dialog-tpls/group-list-replacegroup-maps-dialog-tpls.component';
import { GroupListReplaceItemComponent as PackageDetailGroupListReplaceItemComponent } from './package-detail/group-detail-list/group-list-replace-item/group-list-replace-item.component';
import { GroupListReplaceItemDetailComponent as PackageDetailGroupListReplaceItemDetailComponent } from './package-detail/group-detail-list/group-list-replace-item/group-list-replace-item-detail/group-list-replace-item-detail.component';
import { ProductgroupCategoryComponent } from './productgroup-category/productgroup-category.component';
import { CommonCategoryTplsComponent } from './common/common-category-tpls/common-category-tpls.component';
import { CategoryListComponent as CommonCategoryListComponent } from './common/common-category-tpls/category-list/category-list.component';
import { CategoryListItemDirective as CommonCategoryCategoryListItemDirective } from './common/common-category-tpls/category-list/category-list-item.directive';
import { CategoryFormComponent as CommonCategoryFormComponent } from './common/common-category-tpls/category-form/category-form.component';
import { CategoryIterateListComponent } from './common/common-category-tpls/category-iterate-list/category-iterate-list.component';
import { CategorySelectPanelComponent } from './common/common-category-tpls/category-select-panel/category-select-panel.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ChangeCategorySuitComponent as ProductGroupChangeCategorySuitComponent } from './product-group/change-category-suit/change-category-suit.component';
import { ProductGroupDetailComponent } from './product-group-detail/product-group-detail.component';


@NgModule({
  imports: [
    ServicesModule,
    SharedModule,
    CommonModule,
    TreeModule,
    MatSidenavModule,
    MatStepperModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    BambooRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    TranslateModule,
    FlexLayoutModule,
    ToolkitModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatGridListModule,
    MatFormFieldModule,
    CdkTableModule,
    MatInputModule,
    MatAutocompleteModule
  ],

  declarations: [ProductComponent, DashboardComponent, Login2Component, LoginComponent, OrganComponent, OrganDetailComponent, AccountComponent, AccountDetailComponent, AccountListComponent, DepartmentFormComponent, SolutionComponent, ProductCategoryComponent, OrderComponent, OrderDetailComponent, OrderDetailContentComponent, PackageComponent, PackageDetailComponent, PacakgeDetailContentComponent, StaticmeshComponent, StaticmeshDetailComponent, MaterialComponent, MaterialDetailComponent, MaterialBasicInfoComponent, MapComponent, MapDetailComponent, MaterialCategoryComponent, MaterialCategoryChangeSuitComponent, PaginatorCommonTplsComponent, PagingContentComponent, PagingBarComponent, PageManageButtonComponent, CommonListPageTableListContentComponent, CommonListPageLitimgListContentComponent, LitimgIconItemComponent, CommonListPageBatchDeleteConfirmTplsComponent, CommonDetailEditTplsComponent, SolutionDetailComponent, CommonDetailEditTabDetailInfoTabComponent, CommonDetailEditTabBasicInfoTabComponent, LayoutComponent, LayoutDetailComponent, OrganDetailBasicInfoTabComponent, AccountProfileComponent, PaginatorLeftCategoryCommonTplsComponent, ProductDetailComponent, ProductDetailBasicInfoComponent, ProdcutDetailCategoryChangeSuitComponent, ProductDetailSpecFormComponent, ProductDetailSpecUploadComponent, ProductDetailSpecsCardComponent, ProductDetailSpecsListComponent, ProductChangeCategorySuitComponent, MaterialChangeCategorySuitComponent, CategoryManageCommonTplsComponent, MediaFileComponent, MediaFileDetailComponent, MediaFileShareManageTabComponent, MediaFileShareEditItemComponent, BlankCommonTplsComponent, PackageDetailAreaTypeComponent, PackageDetailAreaTypeDetailComponent, PackageDetailAreaTypePanelComponent, PackageDetailAreaTypePanelDirective, PackageDetailGroupDetailListComponent, PackageDetailAreaTypeSelectComponent, PackageDetailGroupDetailListPanelDirective, CommonCardPanelComponent, CommomCardItemDirective, PackageDetailGroupListGroupMapsComponent, PackageDetailGroupListItemComponent, CommonAutocompleteSearchComponent, PackageDetailGroupListGroupMapsDialogTplsComponent, PackageDetailGroupListCategoryMapsComponent, PackageDetailGroupListCategoryMapsDialogTplsComponent, PackageDetailGroupListMaterialMapsComponent, PackageDetailGroupListMaterialMapsDialogTplsComponent, CommonIconListComponent, CommonIconItemComponent, CommonIconItemDirective, PackageDetailGroupListMaterialItemComponent, PackageDetailGroupListReplacegroupMapsComponent, PackageDetailGroupListReplacegroupMapsDialogTplsComponent, PackageDetailGroupListReplaceItemComponent, PackageDetailGroupListReplaceItemDetailComponent, ProductgroupCategoryComponent, CommonCategoryTplsComponent, CommonCategoryListComponent, CommonCategoryCategoryListItemDirective, CommonCategoryFormComponent, CategoryIterateListComponent, CategorySelectPanelComponent, ProductGroupComponent, ProductGroupChangeCategorySuitComponent, ProductGroupDetailComponent],

  entryComponents: [AccountDetailComponent, DepartmentFormComponent, MaterialCategoryChangeSuitComponent, CommonListPageBatchDeleteConfirmTplsComponent, AccountProfileComponent, ProdcutDetailCategoryChangeSuitComponent, ProductDetailSpecUploadComponent, ProductChangeCategorySuitComponent, MaterialChangeCategorySuitComponent, PackageDetailAreaTypeSelectComponent, PackageDetailGroupListGroupMapsDialogTplsComponent, PackageDetailGroupListCategoryMapsDialogTplsComponent, PackageDetailGroupListMaterialMapsDialogTplsComponent, PackageDetailGroupListReplacegroupMapsDialogTplsComponent, CommonCategoryFormComponent, CategoryIterateListComponent, CategorySelectPanelComponent,ProductGroupChangeCategorySuitComponent],

  providers: [

  ]

  , exports: [
    PaginatorCommonTplsComponent
  ]
})
export class BambooModule { }
