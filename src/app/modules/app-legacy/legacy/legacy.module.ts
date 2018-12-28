import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductService } from './services/webapis/product.service';
import { ProductSpecService } from './services/webapis/productSpec.service';
import { StaticmeshService } from './services/webapis/staticmesh.service';
import { FileAssetService } from './services/webapis/fileasset.service';
import { MaterialService } from './services/webapis/material.service';
import { ErrorService } from './services/webapis/error.service';
import { ChartletService } from './services/webapis/chartlet.service';
import { SolutionService } from './services/webapis/solution.service';
import { ProductCategoryService } from './services/webapis/productcategory.service';
import { IconService } from './services/webapis/icon.service';
import { ProductspecCategoryService } from './services/webapis/productspec-category.service';
import { OrderService } from './services/webapis/order.service';
import { PackageService } from './services/webapis/package.service';
import { MapService } from './services/webapis/map.service';
import { LayoutService } from './services/webapis/layout.service';
import { MaterialCategoryService } from './services/webapis/material-category.service';
import { MediaFileService } from './services/webapis/media-file.service';
import { MediaShareService } from './services/webapis/media-share.service';
import { AreaTypeService } from './services/webapis/area-type.service';
import { ProductgroupCategoryService } from './services/webapis/productgroup-category.service';
import { ProductGroupService } from './services/webapis/product-group.service';
import { PaginatorPageTplsComponent } from './common/page-tpls/paginator-page-tpls/paginator-page-tpls.component';
import { PageManageButtonsComponent } from './common/page-tpls/paginator-page-tpls/page-manage-buttons/page-manage-buttons.component';
import { PagingBarComponent } from './common/page-tpls/paginator-page-tpls/paging-bar/paging-bar.component';
import { PagingContentComponent } from './common/page-tpls/paginator-page-tpls/paging-content/paging-content.component';
import { TableListContentComponent } from './common/page-tpls/paginator-page-tpls/paging-content/table-list-content/table-list-content.component';
import { ServerRedirectPipe } from './common/pipes/server-redirect.pipe';
import { LitimgListContentComponent } from './common/page-tpls/paginator-page-tpls/paging-content/litimg-list-content/litimg-list-content.component';
import { LitimgIconItemComponent } from './common/page-tpls/paginator-page-tpls/paging-content/litimg-list-content/litimg-icon-item/litimg-icon-item.component';
import { WindowService } from './common/objects/window.service';
import { WorkingTimeComponent } from './common/components/working-time/working-time.component';
import { SimpleCsvUploadComponent } from './common/factories/dialog-template/simple-csv-upload/simple-csv-upload.component';
import { SimpleConfirmDialogTplsComponent } from './common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { SimpleMessageContentComponent } from './common/factories/dialog-template/simple-message-content/simple-message-content.component';
import { DetailPageTplsComponent } from './common/page-tpls/detail-page-tpls/detail-page-tpls.component';
import { BasicInfoTabComponent as DetailPageBasicInfoTabComponent } from './common/page-tpls/detail-page-tpls/basic-info-tab/basic-info-tab.component';
import { DetailInfoTabComponent as DetailPageDetailInfoTabComponent } from './common/page-tpls/detail-page-tpls/detail-info-tab/detail-info-tab.component';
import { IconChangeCtDirective } from './common/directives/icon-change-ct.directive';
import { TreeModule } from 'ng2-tree';
import { CategoryEditPageTplsComponent } from './common/page-tpls/category-edit-page-tpls/category-edit-page-tpls.component';
import { CategoryListComponent as CategoryManageCategoryListComponent } from './common/page-tpls/category-edit-page-tpls/category-list/category-list.component';
import { CategoryListItemDirective as CategoryManageCategoryListItemDirective } from './common/page-tpls/category-edit-page-tpls/category-list/category-list-item.directive';
import { CategoryFormComponent as CategoryManageCategoryFormComponent } from './common/page-tpls/category-edit-page-tpls/category-form/category-form.component';
import { CategoryIterateListComponent as CategoryManageCategoryIterateListComponent } from './common/page-tpls/category-edit-page-tpls/category-iterate-list/category-iterate-list.component';
import { CategorySelectPanelComponent } from './common/page-tpls/category-edit-page-tpls/category-select-panel/category-select-panel.component';
import { PaginatorLeftCategoryPageTplsComponent } from './common/page-tpls/paginator-left-category-page-tpls/paginator-left-category-page-tpls.component';
import { SimpleCategoryPanelComponent } from './common/factories/dialog-template/simple-category-panel/simple-category-panel.component';
import { CardListContentComponent } from './common/page-tpls/paginator-page-tpls/paging-content/card-list-content/card-list-content.component';
import { ProductReplaceGroupService } from './services/webapis/product-replace-group.service';
import { ProductReplaceGroupListContentComponent } from './common/page-tpls/paginator-page-tpls/paging-content/spec-list-content/product-replace-group-list-content/product-replace-group-list-content.component';
import { ProductReplaceGroupListItemComponent } from './common/page-tpls/paginator-page-tpls/paging-content/spec-list-content/product-replace-group-list-content/product-replace-group-list-item/product-replace-group-list-item.component';
import { ProductReplaceGroupSetComponent } from './common/page-tpls/paginator-page-tpls/paging-content/spec-list-content/product-replace-group-list-content/product-replace-group-set/product-replace-group-set.component';
import { SimpleIconListPageComponent } from './common/page-tpls/simple-icon-list-page/simple-icon-list-page.component';
import { SimpleIconListItemComponent } from './common/page-tpls/simple-icon-list-page/simple-icon-list-item/simple-icon-list-item.component';
import { SimpleIconListItemDirective } from './common/page-tpls/simple-icon-list-page/simple-icon-list-item/simple-icon-list-item.directive';
import { LazyEntryDialogTplsComponent } from './common/factories/dialog-template/lazy-entry-dialog-tpls/lazy-entry-dialog-tpls.component';
import { ChangeIconComponent } from './common/components/change-icon/change-icon.component';
import { CardListPanelTplsComponent } from './common/page-tpls/card-list-panel-tpls/card-list-panel-tpls.component';
import { CardListPanelTplsDirective } from './common/page-tpls/card-list-panel-tpls/card-list-panel-tpls.directive';
import { SimpleTableListTplsComponent } from './common/page-tpls/simple-table-list-tpls/simple-table-list-tpls.component';
import { EditPermissionComponent as PaginatorListEditPermissionComponent } from './common/page-tpls/paginator-page-tpls/edit-permission/edit-permission.component';
import { V1DyListPageTplsComponent } from './common/page-tpls/v1-dy-list-page-tpls/v1-dy-list-page-tpls.component';
import { OPaginatorBarComponent as V1DyListPageTplsOPaginatorBarComponent } from './common/page-tpls/v1-dy-list-page-tpls/o-paginator-bar/o-paginator-bar.component';
import { OManageButtonsComponent as V1DyListPageTplsOManageButtonsComponent } from './common/page-tpls/v1-dy-list-page-tpls/o-manage-buttons/o-manage-buttons.component';
import { OContentComponent as V1DyListPageTplsOContentComponent } from './common/page-tpls/v1-dy-list-page-tpls/o-content/o-content.component';
import { PTableListComponent as V1DyListPageTplsOContentPTableListComponent } from './common/page-tpls/v1-dy-list-page-tpls/o-content/p-table-list/p-table-list.component';
import { PLitimgListComponent as V1DyListPageTplsOContentPLitimgListComponent } from './common/page-tpls/v1-dy-list-page-tpls/o-content/p-litimg-list/p-litimg-list.component';
import { OSimpleEditComponent } from './common/page-tpls/v1-dy-list-page-tpls/o-simple-edit/o-simple-edit.component';
import { SimpleBlankTplsComponent } from './common/factories/dialog-template/simple-blank-tpls/simple-blank-tpls.component';
import { V1FixListPageTplsComponent } from './common/page-tpls/v1-fix-list-page-tpls/v1-fix-list-page-tpls.component';
import { V1BlankPageTplsComponent } from './common/page-tpls/v1-blank-page-tpls/v1-blank-page-tpls.component';
import { V2BlankPageTplsComponent } from './common/page-tpls/v2-blank-page-tpls/v2-blank-page-tpls.component';
import { DialogFactoryService } from './common/factories/dialog-factory.service';
import { SnackbarService } from './services/common/snackbar.service';
import { AsyncHandleService } from './services/common/async-handle.service';
import { ScaffoldNgBclModule } from '@geek/scaffold-ng-bcl';
import { ScaffoldMatBclModule } from '@geek/scaffold-mat-bcl';
import { ScaffoldPagePlateModule } from '@geek/scaffold-page-plate';

@NgModule({
  imports: [
    ScaffoldNgBclModule,
    ScaffoldMatBclModule,
    ScaffoldPagePlateModule,
    FlexLayoutModule,
    TranslateModule,
    TreeModule
  ],
  declarations: [PaginatorPageTplsComponent, PageManageButtonsComponent, PagingBarComponent, PagingContentComponent, TableListContentComponent, ServerRedirectPipe, LitimgListContentComponent, LitimgIconItemComponent, WorkingTimeComponent, SimpleCsvUploadComponent, SimpleConfirmDialogTplsComponent, SimpleMessageContentComponent, DetailPageTplsComponent, DetailPageBasicInfoTabComponent, DetailPageDetailInfoTabComponent, IconChangeCtDirective, CategoryEditPageTplsComponent, CategoryManageCategoryListComponent, CategoryManageCategoryListItemDirective, CategoryManageCategoryFormComponent, CategoryManageCategoryIterateListComponent, CategorySelectPanelComponent, PaginatorLeftCategoryPageTplsComponent, SimpleCategoryPanelComponent, CardListContentComponent, ProductReplaceGroupListContentComponent, ProductReplaceGroupListItemComponent, ProductReplaceGroupSetComponent, SimpleIconListPageComponent, SimpleIconListItemComponent, SimpleIconListItemDirective, LazyEntryDialogTplsComponent, ChangeIconComponent, CardListPanelTplsComponent, CardListPanelTplsDirective, SimpleTableListTplsComponent, PaginatorListEditPermissionComponent, V1DyListPageTplsOPaginatorBarComponent, V1DyListPageTplsOManageButtonsComponent, V1DyListPageTplsOContentComponent, V1DyListPageTplsOContentPTableListComponent, V1DyListPageTplsOContentPLitimgListComponent, OSimpleEditComponent, SimpleBlankTplsComponent, V1DyListPageTplsComponent, V1FixListPageTplsComponent, V1BlankPageTplsComponent, V2BlankPageTplsComponent],
  providers: [
     WindowService
    , AsyncHandleService
    , SnackbarService
    , TranslateService
    , ProductService
    , DialogFactoryService
    , ProductSpecService
    , StaticmeshService
    , FileAssetService
    , MaterialService
    , ErrorService
    , ChartletService
    , SolutionService
    , ProductCategoryService
    , IconService
    , ProductspecCategoryService
    , OrderService
    , PackageService
    , MapService
    , LayoutService
    , MaterialCategoryService
    , MediaFileService
    , MediaShareService
    , AreaTypeService
    , ProductGroupService
    , ProductgroupCategoryService
    , ProductReplaceGroupService
  ],
  exports: [
    TreeModule,
    ServerRedirectPipe,
    PaginatorPageTplsComponent,
    DetailPageTplsComponent,
    CategoryEditPageTplsComponent,
    PaginatorLeftCategoryPageTplsComponent,
    CategorySelectPanelComponent,
    DetailPageBasicInfoTabComponent,
    DetailPageDetailInfoTabComponent,
    SimpleIconListPageComponent,
    IconChangeCtDirective,
    CardListPanelTplsComponent,
    SimpleTableListTplsComponent,
    V1DyListPageTplsOPaginatorBarComponent,
    V1DyListPageTplsOManageButtonsComponent,
    V1DyListPageTplsOContentComponent,
    V1DyListPageTplsComponent,
    V1BlankPageTplsComponent,
    V2BlankPageTplsComponent
  ],
  entryComponents: [
    SimpleBlankTplsComponent,
    SimpleCsvUploadComponent,
    SimpleConfirmDialogTplsComponent,
    SimpleMessageContentComponent,
    CategoryManageCategoryFormComponent,
    CategoryManageCategoryIterateListComponent,
    CategorySelectPanelComponent,
    SimpleCategoryPanelComponent,
    LazyEntryDialogTplsComponent,
    ChangeIconComponent,
    PaginatorListEditPermissionComponent
  ]
})
export class LegacyModule { }
