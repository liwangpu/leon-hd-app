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
import { OAccountDetailComponent } from './organ/o-account-detail/o-account-detail.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DepartmentCardComponent } from './account/department-card/department-card.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { DepartmentFormComponent } from './account/department-form/department-form.component';
import { BasicInfoComponent as ProductBasicInfoComponent } from './product-detail/basic-info/basic-info.component';
import { ProductDetailMdService } from "./product-detail/product-detail-md.service";
import { SolutionComponent } from './solution/solution.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { BasicInfoComponent as SolutionBasicInfoComponent } from "./solution-detail/basic-info/basic-info.component";
import { SolutionDetailMdService } from "./solution-detail/solution-detail-md.service";
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
import { CategoryMdService } from './product-category/category-md.service';
import { ProductspecCateogoryComponent } from './productspec-cateogory/productspec-cateogory.component';
import { CategoryPanelComponent as ProductSpecCategoryPanelComponent } from './productspec-cateogory/category-panel/category-panel.component';
import { AccountMdService } from "./account/account-md.service";
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { BasicInfoComponent as OrderBasicInfoComponent } from './order-detail/basic-info/basic-info.component';
import { OrderDetailMdService } from "./order-detail/order-detail-md.service";
import { PackageDetailMdService } from "./package-detail/package-detail-md.service";
import { DetailContentComponent as OrderDetailContentComponent } from './order-detail/detail-content/detail-content.component';
import { PackageComponent } from './package/package.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { BasicInfoComponent as PackageBasicInfoComponent } from './package-detail/basic-info/basic-info.component';
import { DetailContentComponent as PacakgeDetailContentComponent } from './package-detail/detail-content/detail-content.component';
@NgModule({
  imports: [
    ServicesModule,
    SharedModule,
    CommonModule,
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

  declarations: [ProductComponent, ProductDetailComponent, IconItemComponent, DashboardComponent, Login2Component, LoginComponent, OrganComponent, OrganDetailComponent, OAccountDetailComponent, AccountComponent, AccountDetailComponent, DepartmentCardComponent, AccountListComponent, DepartmentFormComponent, ProductBasicInfoComponent, SolutionComponent, SolutionDetailComponent, SolutionBasicInfoComponent, ProductSpecsListComponent, ProductSpecsCardComponent, ProductSpecFormComponent, ProductCategoryComponent, ProductCategoryListComponent, ProductCategoryItemDirective, ProductSpecUploadComponent, ProductCategoryIterateCateComponent, ProductCategoryCategoryFormComponent, ProductCategoryPanelComponent, ProductspecCateogoryComponent, ProductSpecCategoryPanelComponent, OrderComponent, OrderDetailComponent, OrderBasicInfoComponent, OrderDetailContentComponent, PackageComponent, PackageDetailComponent, PackageBasicInfoComponent, PacakgeDetailContentComponent],

  entryComponents: [AccountDetailComponent, DepartmentFormComponent, ProductSpecFormComponent, ProductSpecUploadComponent, ProductCategoryIterateCateComponent, ProductCategoryCategoryFormComponent, ProductCategoryPanelComponent, ProductSpecCategoryPanelComponent],

  providers: [
    ProductDetailMdService,
    SolutionDetailMdService,
    CategoryMdService,
    AccountMdService,
    OrderDetailMdService,
    PackageDetailMdService
  ]
})
export class BambooModule { }
