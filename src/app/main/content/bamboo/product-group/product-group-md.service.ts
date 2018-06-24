import { Injectable } from '@angular/core';
import { PaginatorLaunch, IListTableColumn, IAdvanceMenuItem } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { ProductGroup } from '../../../toolkit/models/product-group';
import { DatePipe } from '@angular/common';
import { ProductGroupService } from '../../../toolkit/server/webapi/product-group.service';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { ChangeCategorySuitComponent } from './change-category-suit/change-category-suit.component';

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
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: ProductGroup) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: ProductGroupService, protected dialogFac: DialogFactoryService) {
    super(datePipe);


    let changeCategoryMenuItem: IAdvanceMenuItem = {
      icon: 'swap_horiz', name: 'button.ChangeCategory', needSelected: true, click: (selectedIds: Array<string>) => {
        let idsStr = selectedIds.join(',');
        let dialog = this.dialogFac.tplsConfirm(ChangeCategorySuitComponent, '选择分类', { width: '450px', height: '550px', data: { ids: idsStr } });

        dialog.afterOpen().first().subscribe(() => {
          (dialog.componentInstance.componentIns as ChangeCategorySuitComponent).afterChangeCategory.subscribe(() => {
            this.refreshData$.next();
          });
        });
      }
    };
    this.advanceMenuItems.push(changeCategoryMenuItem);


    // let uploadCategoryMenuItem: IAdvanceMenuItem = {
    //   icon: 'swap_vert', name: 'button.BulkCategory', click: () => {

    //     let dialogTransAsync = () => {
    //       return new Promise((resolve) => {
    //         this.tranSrv.get('tips.UploadCategoryByCSV').subscribe(msg => {
    //           resolve(msg);
    //         });
    //       });//promise
    //     };//dialogTransAsync

    //     let showDialogAsync = (title) => {
    //       return new Promise((resolve) => {
    //         let dialog = this.dialogFac.simpleCsvUpload(title, { width: '450px', height: '550px', uploadUrl: 'products/ImportProductAndCategory', templateCsvUrl: 'products/ProductAndCategoryImportTemplate' });
    //         dialog.afterOpen().first().subscribe(() => {
    //           let ins = (dialog.componentInstance.componentIns as SimpleCsvUploadComponent);
    //           ins.doneAsync.subscribe((state) => {
    //             if (state) {
    //               ins.closeDialog.next();
    //             }
    //           });
    //         });
    //       });//promise
    //     };//showDialogAsync

    //     dialogTransAsync().then(showDialogAsync);

    //   }
    // };
    // this.advanceMenuItems.push(uploadCategoryMenuItem);
  }//constructor

}
