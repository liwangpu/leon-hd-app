import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './product-spec/upload/upload.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedCommonModule } from '../common/shared-common.module';
import { AppServiceModule } from '../server/app.service.module';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleListComponent } from './simple-list/simple-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatStepperModule,
    MatGridListModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSortModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppServiceModule,
    SharedCommonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [UploadComponent, SimpleListComponent],
  exports: [UploadComponent, SimpleListComponent]
})
export class SceneModule { }
