import { Injectable } from '@angular/core';
import { PaginatorLaunch, IListTableColumn } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { ProductGroup } from '../../share/models/product-group';
import { DatePipe } from '@angular/common';
import { ProductGroupService } from '../../share/services/webapis/product-group.service';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';
import { SimpleCategoryPanelComponent } from '../../share/common/factories/dialog-template/simple-category-panel/simple-category-panel.component';
import { ProductGroupLeftCategoryLaunchService } from './product-group-left-category-launch.service';

@Injectable()
export class ProductGroupPaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/product-group-detail';
  titleIcon = 'bubble_chart';
  title = 'glossary.ProductGroup';
  columnDefs: Array<IListTableColumn<ProductGroup>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: ProductGroup) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: ProductGroup) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: ProductGroup) => data.description ? data.description : '' }
    , { columnDef: 'categoryName', _columnDef: 'categoryId', header: 'glossary.Category', width: 80, cell: (data: ProductGroup) => data.categoryName ? data.categoryName : '' }
    , { columnDef: 'shareState', _columnDef: 'resourceType', header: 'glossary.ShareState', width: 70, cell: (data: ProductGroup) => data.resourceType > 0 ? 'glossary.Share' : '', translate: true }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 110, cell: (data: ProductGroup) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: ProductGroupService, protected dialogFac: DialogFactoryService, protected syncHandle: AsyncHandleService, protected leftCategorySrv: ProductGroupLeftCategoryLaunchService) {
    super(datePipe, syncHandle, dialogFac);


    this.advanceMenuItems = [
      this.editPermissionMenuItem
      , {
        icon: 'swap_horiz', name: 'button.ChangeCategory', needSelected: true, click: (selectedIds: Array<string>) => {
          this.changeCategory(selectedIds);
        }
      }
      , { icon: 'share', name: 'button.Share', needSelected: true, click: (ids: Array<string>) => { this.shares(ids); } }
      , { icon: 'share', name: 'button.CancelShare', needSelected: true, click: (ids: Array<string>) => { this.cancelShares(ids); } }
    ];
  }//constructor

  changeCategory(selectedIds: Array<string>) {
    let idsStr = selectedIds.join(',');
    let dialog = this.dialogFac.simpleCategorySelect(this.leftCategorySrv);

    dialog.afterOpen().subscribe(() => {
      let ins: SimpleCategoryPanelComponent = dialog.componentInstance.componentIns;
      ins.afterConfirm.subscribe(() => {
        let source$ = this.apiSrv.bulkChangeCategory(idsStr, ins.selectedCategoryId);
        this.syncHandle.asyncRequest(source$).subscribe(() => {
          ins.doneAsync.next();
          this.refreshData$.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });
    });//afterOpen
  }//changeCategory

  shares(ids: Array<string>) {
    let source$ = this.apiSrv.shareDatas(ids);
    this.syncHandle.asyncRequest(source$).subscribe(_ => {
      this.refreshData$.next();
    });
  }//shareSolutions

  cancelShares(ids: Array<string>) {
    let source$ = this.apiSrv.cancelShareDatas(ids);
    this.syncHandle.asyncRequest(source$).subscribe(_ => {
      this.refreshData$.next();
    });
  }//shareSolutions
}
