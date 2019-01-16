import { NgModule } from '@angular/core';
import { ChangeIconDialogPlateComponent } from './components/dialog-plate/change-icon-dialog-plate/change-icon-dialog-plate.component';
import { LazyModuleConfirmDialogPlateComponent } from './components/dialog-plate/lazy-module-confirm-dialog-plate/lazy-module-confirm-dialog-plate.component';
import { SimpleConfirmDialogPlateComponent } from './components/dialog-plate/simple-confirm-dialog-plate/simple-confirm-dialog-plate.component';
import { AsyncHandleService } from './services/async-handle.service';
import { DialogFactoryService } from './services/dialog-factory.service';
import { SnackbarService } from './services/snackbar.service';
import { TranslateModule } from '@ngx-translate/core';
import { ServerRedirectPipe } from './pipes/server-redirect.pipe';
import { ScaffoldMatBclModule } from 'scaffold-mat-bcl';
import { ScaffoldNgBclModule } from 'scaffold-ng-bcl';
import { MatAutoSelectComponent } from './components/select-input/mat-auto-select/mat-auto-select.component';
import { MatApiAutoSelectComponent } from './components/select-input/mat-api-auto-select/mat-api-auto-select.component';
import { NavFilterPipe } from './pipes/nav-filter.pipe';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
// import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    ScaffoldNgBclModule,
    TranslateModule,
    ScaffoldMatBclModule
  ],
  declarations: [ChangeIconDialogPlateComponent, LazyModuleConfirmDialogPlateComponent, SimpleConfirmDialogPlateComponent, ServerRedirectPipe, NavFilterPipe, MatAutoSelectComponent, MatApiAutoSelectComponent, CopyClipboardDirective],
  providers: [
    AsyncHandleService,
    DialogFactoryService,
    SnackbarService
  ],
  exports: [
    SimpleConfirmDialogPlateComponent
    , ChangeIconDialogPlateComponent
    , ServerRedirectPipe
    , NavFilterPipe
    , MatAutoSelectComponent
    , MatApiAutoSelectComponent
    , CopyClipboardDirective
    // , QRCodeModule
  ],
  entryComponents: [
    SimpleConfirmDialogPlateComponent
    , ChangeIconDialogPlateComponent
    , LazyModuleConfirmDialogPlateComponent
  ]
})
export class ScaffoldAppMinorModule {
}

