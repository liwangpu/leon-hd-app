import { NgModule } from '@angular/core';
import { ScaffoldNgBclModule } from "@geek/scaffold-ng-bcl";
import { ScaffoldMatBclModule } from "@geek/scaffold-mat-bcl";
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonAppBasicNavSidebarComponent } from './components/commons/common-app-basic-nav-sidebar/common-app-basic-nav-sidebar.component';
import { BlankComponent } from './components/blank/blank.component';
import { ClassicListViewComponent } from './components/list-view/classic-list-view/classic-list-view.component';
import { CommonPaginatorBarComponent } from './components/commons/common-paginator-bar/common-paginator-bar.component';
import { CommonTableListComponent } from './components/commons/common-table-list/common-table-list.component';
import { CommonLitimgListComponent } from './components/commons/common-litimg-list/common-litimg-list.component';
import { CommonListViewerComponent } from './components/commons/common-list-viewer/common-list-viewer.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonManageBarComponent } from './components/commons/common-manage-bar/common-manage-bar.component';
import { DetailEditorComponent } from './components/detail-editor/detail-editor/detail-editor.component';
import { BasicDetailEditorComponent } from './components/detail-editor/basic-detail-editor/basic-detail-editor.component';
import { LeftDrawerListViewComponent } from './components/list-view/left-drawer-list-view/left-drawer-list-view.component';
import { CommonSidebarCollapsePanelComponent } from './components/commons/common-sidebar-collapse-panel/common-sidebar-collapse-panel.component';
import { SimpleConfirmDialogComponent } from './components/dialog/simple-confirm-dialog/simple-confirm-dialog.component';
import { ScaffoldAppMinorModule } from '@geek/scaffold-app-minor';
import { SimpleConfirmMessageDialogComponent } from './components/dialog/simple-confirm-message-dialog/simple-confirm-message-dialog.component';
import { CategoryEditorComponent } from './components/category-editor/category-editor.component';
@NgModule({
  imports: [
    ScaffoldNgBclModule,
    ScaffoldMatBclModule,
    ScaffoldAppMinorModule,
    TranslateModule,
    FlexLayoutModule
  ],
  declarations: [CommonAppBasicNavSidebarComponent, BlankComponent, ClassicListViewComponent, CommonPaginatorBarComponent, CommonTableListComponent, CommonLitimgListComponent, CommonListViewerComponent, CommonManageBarComponent, DetailEditorComponent, BasicDetailEditorComponent, LeftDrawerListViewComponent, CommonSidebarCollapsePanelComponent, SimpleConfirmDialogComponent, SimpleConfirmMessageDialogComponent, CategoryEditorComponent],
  exports: [
    BlankComponent
    , CommonAppBasicNavSidebarComponent
    , CommonSidebarCollapsePanelComponent
    , ClassicListViewComponent
    , LeftDrawerListViewComponent
    , BasicDetailEditorComponent
    , DetailEditorComponent
    , SimpleConfirmDialogComponent
    , SimpleConfirmMessageDialogComponent
  ],
  entryComponents: [
    SimpleConfirmMessageDialogComponent
  ]
})
export class ScaffoldPagePlateModule { }
