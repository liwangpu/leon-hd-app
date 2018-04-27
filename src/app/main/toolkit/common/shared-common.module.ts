import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LitimgListComponent } from './components/litimg-list/litimg-list.component';
import { LitimgCtDirective } from './directives/litimg-ct.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LitimgToolDirective } from './directives/litimg-tool.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from './services/dialog.service';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './services/snackbar.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { StepperComponent } from './components/uploader/stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { PanelComponent } from './components/uploader/panel/panel.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FileUploadModule } from "ng2-file-upload";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilenamePipe } from './pipes/filename.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DownloadService } from './services/download.service';
import { InputCtDirective } from './directives/input-ct.directive';
import { AppServiceModule } from '../server/app.service.module';
import { MomentService } from "./services/moment.service";
import { DatePipe } from "@angular/common";
import { OrderbyPipe } from './pipes/orderby.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FileUploadModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatStepperModule,
    HttpClientModule,
    FlexLayoutModule,
    AppServiceModule
  ],
  declarations: [
    LitimgListComponent
    , LitimgCtDirective
    , LitimgToolDirective
    , SimpleDialogComponent
    , ConfirmDialogComponent
    , StepperComponent,
    PanelComponent,
    FilenamePipe,
    InputCtDirective,
    OrderbyPipe
  ],
  providers: [
    DialogService,
    SnackbarService,
    TranslateService,
    FilenamePipe,
    DownloadService,
    DatePipe,
    MomentService
  ]
  , exports: [
    LitimgListComponent,
    StepperComponent,
    PanelComponent,
    OrderbyPipe
  ],
  entryComponents: [
    SimpleDialogComponent,
    ConfirmDialogComponent,
    StepperComponent,
    PanelComponent
  ]
})
export class SharedCommonModule { }
