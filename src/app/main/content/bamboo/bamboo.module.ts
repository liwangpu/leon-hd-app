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
@NgModule({
  imports: [
    ServicesModule,
    SharedModule,
    CommonModule,
    MatStepperModule,
    BrowserAnimationsModule,
    BambooRoutingModule,
    FormsModule,
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
    MatInputModule
  ],
  declarations: [ProductComponent, ProductDetailComponent, IconItemComponent, DashboardComponent, Login2Component, LoginComponent, OrganComponent]
})
export class BambooModule { }
