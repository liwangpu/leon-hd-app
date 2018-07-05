import { Injectable } from '@angular/core';
import { PaginatorLaunch, IListTableColumn, IAdvanceMenuItem } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { ProductGroup } from '../../../toolkit/models/product-group';
import { DatePipe } from '@angular/common';
import { ProductGroupService } from '../../../toolkit/server/webapi/product-group.service';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { ChangeCategorySuitComponent } from './change-category-suit/change-category-suit.component';
import { AsyncHandleService } from '../../services/async-handle.service';

@Injectable()
export class ProductGroupMdService extends PaginatorLaunch {

  createdUrl = 'app/product-group-detail';
  titleIcon = 'bubble_chart';
  title = 'glossary.ProductGroup';
  columnDefs: Array<IListTableColumn<ProductGroup>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: ProductGroup) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: ProductGroup) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: ProductGroup) => data.description ? data.description : '' }
    , { columnDef: 'categoryName', _columnDef: 'categoryId', header: 'glossary.Category', width: 80, cell: (data: ProductGroup) => data.categoryName ? data.categoryName : '' }
    , { columnDef: 'shareState', _columnDef: 'resourceType', header: 'glossary.ShareState', width: 70, cell: (data: ProductGroup) => data.resourceType > 0 ? 'glossary.Share' : '', translate: true }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: ProductGroup) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: ProductGroupService, protected dialogFac: DialogFactoryService, private syncHandle: AsyncHandleService) {
    super(datePipe);


    this.advanceMenuItems = [
      {
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
    let dialog = this.dialogFac.tplsConfirm(ChangeCategorySuitComponent, '选择分类', { width: '450px', height: '550px', data: { ids: idsStr } });

    dialog.afterOpen().first().subscribe(() => {
      (dialog.componentInstance.componentIns as ChangeCategorySuitComponent).afterChangeCategory.subscribe(() => {
        this.refreshData$.next();
      });
    });
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
