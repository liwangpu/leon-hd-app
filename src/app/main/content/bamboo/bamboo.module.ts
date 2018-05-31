import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BambooRoutingModule } from './bamboo-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ToolkitModule } from "../../toolkit/toolkit.module";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { IconItemComponent } from "./common/iconitem.component";
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
import { DepartmentCardComponent } from './account/department-card/department-card.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { DepartmentFormComponent } from './account/department-form/department-form.component';
import { BasicInfoComponent as ProductBasicInfoComponent } from './product-detail/basic-info/basic-info.component';
import { SolutionComponent } from './solution/solution.component';
import { SpecsListComponent as ProductSpecsListComponent } from './product-detail/specs-list/specs-list.component';
import { SpecsCardComponent as ProductSpecsCardComponent } from './product-detail/specs-card/specs-card.component';
import { SpecFormComponent as ProductSpecFormComponent } from './product-detail/spec-form/spec-form.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CategoryListComponent as ProductCategoryListComponent } from './product-category/category-list/category-list.component';
import { CategoryItemDirective as ProductCategoryItemDirective } from './product-category/category-list/category-item.directive';
import { SpecUploadComponent as ProductSpecUploadComponent } from './product-detail/spec-upload/spec-upload.component';
import { IterateCateComponent as ProductCategoryIterateCateComponent } from './product-category/iterate-cate/iterate-cate.component';
import { CategoryFormComponent as ProductCategoryCategoryFormComponent } from './product-category/category-form/category-form.component';
import { CategoryPanelComponent as ProductCategoryPanelComponent } from './product-category/category-panel/category-panel.component';
import { ProductspecCateogoryComponent } from './productspec-cateogory/productspec-cateogory.component';
import { CategoryPanelComponent as ProductSpecCategoryPanelComponent } from './productspec-cateogory/category-panel/category-panel.component';
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
import { CategoryMdService } from './product-category/category-md.service';
import { MapComponent } from './map/map.component';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { CategoryListComponent as ProductViewCategoryListComponent } from './product/category-list/category-list.component';
import { ProductListComponent as ProductListViewComponent } from './product/product-list/product-list.component';
import { SelectPanelComponent as ProductCategorySelectPanelComponent } from './product-category/select-panel/select-panel.component';
import { ChangeCategoryComponent as ProductCategoryChangeCategoryComponent } from "./product/change-category.component";
import { CategoryChangeSuitComponent as ProductDetailCateChangeSuitComponent } from './product-detail/basic-info/category-change-suit.component';
import { MaterialCategoryComponent } from './material-category/material-category.component';
import { CategoryListComponent as MaterialCategoryListComponent } from './material/category-list/category-list.component';
import { SelectPanelComponent as MaterialSelectPanelComponent } from './material-category/select-panel/select-panel.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { ChangeCategorySuitComponent as MaterialChangeCategorySuitComponent } from './material/change-category-suit.component';
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




@NgModule({
  imports: [
    ServicesModule,
    SharedModule,
    CommonModule,
    TreeModule,
    MatSidenavModule,
    MatStepperModule,
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

  declarations: [ProductComponent, ProductDetailComponent, IconItemComponent, DashboardComponent, Login2Component, LoginComponent, OrganComponent, OrganDetailComponent, AccountComponent, AccountDetailComponent, DepartmentCardComponent, AccountListComponent, DepartmentFormComponent, ProductBasicInfoComponent, SolutionComponent, ProductSpecsListComponent, ProductSpecsCardComponent, ProductSpecFormComponent, ProductCategoryComponent, ProductCategoryListComponent, ProductCategoryItemDirective, ProductSpecUploadComponent, ProductCategoryIterateCateComponent, ProductCategoryCategoryFormComponent, ProductCategoryPanelComponent, ProductspecCateogoryComponent, ProductSpecCategoryPanelComponent, OrderComponent, OrderDetailComponent, OrderDetailContentComponent, PackageComponent, PackageDetailComponent, PacakgeDetailContentComponent, StaticmeshComponent, StaticmeshDetailComponent, MaterialComponent, MaterialDetailComponent, MaterialBasicInfoComponent, MapComponent, MapDetailComponent, ProductViewCategoryListComponent, ProductListViewComponent, ProductCategorySelectPanelComponent, ProductCategoryChangeCategoryComponent, ProductDetailCateChangeSuitComponent, MaterialCategoryComponent, MaterialCategoryListComponent, MaterialSelectPanelComponent, MaterialListComponent, MaterialChangeCategorySuitComponent, MaterialCategoryChangeSuitComponent, PaginatorCommonTplsComponent, PagingContentComponent, PagingBarComponent, PageManageButtonComponent, CommonListPageTableListContentComponent, CommonListPageLitimgListContentComponent, LitimgIconItemComponent, CommonListPageBatchDeleteConfirmTplsComponent, CommonDetailEditTplsComponent, SolutionDetailComponent, CommonDetailEditTabDetailInfoTabComponent, CommonDetailEditTabBasicInfoTabComponent, LayoutComponent, LayoutDetailComponent,],

  entryComponents: [AccountDetailComponent, DepartmentFormComponent, ProductSpecFormComponent, ProductSpecUploadComponent, ProductCategoryIterateCateComponent, ProductCategoryCategoryFormComponent, ProductCategoryPanelComponent, ProductSpecCategoryPanelComponent, ProductCategorySelectPanelComponent
    , ProductCategoryChangeCategoryComponent, ProductDetailCateChangeSuitComponent, MaterialChangeCategorySuitComponent
    , MaterialCategoryChangeSuitComponent, CommonListPageBatchDeleteConfirmTplsComponent],

  providers: [
    CategoryMdService
  ]

  , exports: [
    PaginatorCommonTplsComponent
  ]
})
export class BambooModule { }
