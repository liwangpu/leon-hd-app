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
import { FuseContactsModule } from "./contacts/contacts.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { OAccountDetailComponent } from './organ/o-account-detail/o-account-detail.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DepartmentCardComponent } from './account/department-card/department-card.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { DepartmentFormComponent } from './account/department-form/department-form.component';
import { FuseChatModule } from "./product-detail/chat/chat.module";
import { SpecsNavLeftComponent } from './product-detail/specs-navs/specs-nav-left/specs-nav-left.component';
import { SpecsNavRightComponent } from './product-detail/specs-navs/specs-nav-right/specs-nav-right.component';
import { SpecNavLeftProductComponent } from './product-detail/specs-navs/specs-nav-left/spec-nav-left-product/spec-nav-left-product.component';
import { SpecNavLeftSpecsComponent } from './product-detail/specs-navs/specs-nav-left/spec-nav-left-specs/spec-nav-left-specs.component';
import { ProductDetailService } from "./product-detail/product-detail.service";
import { SpecNavLeftSpecComponent } from './product-detail/specs-navs/specs-nav-left/spec-nav-left-spec/spec-nav-left-spec.component';
// import { SceneModule } from "../../toolkit/scene/scene.module";
// import { UploadComponent } from "../../toolkit/scene/product-spec/upload/upload.component";
import { SpecUploadComponent } from './product-detail/spec-upload/spec-upload.component';
import { SpecCharletsComponent } from './product-detail/spec-charlets/spec-charlets.component';


@NgModule({
  imports: [
    ServicesModule,
    SharedModule,
    // SceneModule,
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
    FuseContactsModule,
    FuseChatModule
  ],
  declarations: [ProductComponent, ProductDetailComponent, IconItemComponent, DashboardComponent, Login2Component, LoginComponent, OrganComponent, OrganDetailComponent, OAccountDetailComponent, AccountComponent, AccountDetailComponent, DepartmentCardComponent, AccountListComponent, DepartmentFormComponent, SpecsNavLeftComponent, SpecsNavRightComponent, SpecNavLeftProductComponent, SpecNavLeftSpecsComponent, SpecNavLeftSpecComponent, SpecUploadComponent, SpecCharletsComponent],
  entryComponents: [AccountDetailComponent, DepartmentFormComponent, SpecUploadComponent],
  providers: [
    ProductDetailService
  ]
})
export class BambooModule { }
