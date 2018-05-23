import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { MathexService } from "./services/mathex.service";
import { ChangeIconComponent } from './components/uploader/change-icon/change-icon.component';
import { IconChangeCtDirective } from './directives/icon-change-ct.directive';
import { ConfirmDialogComponent as DialogSetConfirmDialogComponent } from "./components/dialog/confirm-dialog/confirm-dialog.component";
import { UploadIconDialogComponent as DialogSetUploadIconDialogComponent } from './components/dialog/upload-icon-dialog/upload-icon-dialog.component';
import { Panel2Component } from './components/uploader/panel2/panel2.component';
import { SizeCtDirective } from './directives/size-ct.directive';
import { WindowService } from './object/window.service';
import { SimpleConfirmDialogTplsComponent } from './factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { SimpleMessageContentComponent } from './factory/dialog-template/simple-message-content/simple-message-content.component';
import { DialogFactoryService } from './factory/dialog-factory.service';
import { SimpleCsvUploadComponent } from './factory/dialog-template/simple-csv-upload/simple-csv-upload.component';
import { WorkingTimeComponent } from './components/working-time/working-time.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FileUploadModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    TranslateModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatStepperModule,
    HttpClientModule,
    FlexLayoutModule,
    AppServiceModule
  ],
  declarations: [
    LitimgListComponent,
    LitimgCtDirective,
    LitimgToolDirective,
    SimpleDialogComponent,
    ConfirmDialogComponent,
    PanelComponent,
    FilenamePipe,
    InputCtDirective,
    OrderbyPipe,
    ChangeIconComponent,
    IconChangeCtDirective,
    DialogSetConfirmDialogComponent,
    DialogSetUploadIconDialogComponent,
    Panel2Component,
    SizeCtDirective,
    SimpleConfirmDialogTplsComponent,
    SimpleMessageContentComponent,
    SimpleCsvUploadComponent,
    WorkingTimeComponent
  ],
  providers: [
    DialogService,
    SnackbarService,
    TranslateService,
    FilenamePipe,
    DownloadService,
    DatePipe,
    MomentService,
    MathexService,
    WindowService,
    DialogFactoryService
  ]
  , exports: [
    LitimgListComponent,
    PanelComponent,
    OrderbyPipe,
    ChangeIconComponent,
    IconChangeCtDirective,
    SizeCtDirective
  ],
  entryComponents: [
    SimpleDialogComponent,
    ConfirmDialogComponent,
    PanelComponent,
    ChangeIconComponent,
    DialogSetConfirmDialogComponent,
    DialogSetUploadIconDialogComponent,
    SimpleConfirmDialogTplsComponent,
    SimpleMessageContentComponent,
    SimpleCsvUploadComponent
  ]
})
export class SharedCommonModule { }
