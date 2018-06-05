import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorLaunch, IListTableColumn, IAdvanceMenuItem } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { Product } from '../../../toolkit/models/product';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../toolkit/server/webapi/product.service';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { ChangeCategorySuitComponent } from './change-category-suit/change-category-suit.component';
import { TranslateService } from '@ngx-translate/core';
import { SimpleCsvUploadComponent } from '../../../toolkit/common/factory/dialog-template/simple-csv-upload/simple-csv-upload.component';

@Injectable()
export class ProductMdService extends PaginatorLaunch {

  createdUrl = 'app/product-detail';
  titleIcon = 'shopping_basket';
  title = 'glossary.Product';
  columnDefs: Array<IListTableColumn<Product>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Product) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Product) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Product) => data.description ? data.description : '' }
    , { columnDef: 'categoryName', _columnDef: 'categoryId', header: 'glossary.Category', width: 80, cell: (data: Product) => data.categoryName ? data.categoryName : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Product) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: ProductService, protected dialogFac: DialogFactoryService, protected tranSrv: TranslateService) {
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


    let uploadCategoryMenuItem: IAdvanceMenuItem = {
      icon: 'swap_vert', name: 'button.BulkCategory', click: () => {

        let dialogTransAsync = () => {
          return new Promise((resolve) => {
            this.tranSrv.get('tips.UploadCategoryByCSV').subscribe(msg => {
              resolve(msg);
            });
          });//promise
        };//dialogTransAsync

        let showDialogAsync = (title) => {
          return new Promise((resolve) => {
            let dialog = this.dialogFac.simpleCsvUpload(title, { width: '450px', height: '550px', uploadUrl: 'products/ImportProductAndCategory', templateCsvUrl: 'products/ProductAndCategoryImportTemplate' });
            dialog.afterOpen().first().subscribe(() => {
              let ins = (dialog.componentInstance.componentIns as SimpleCsvUploadComponent);
              ins.doneAsync.subscribe((state) => {
                if (state) {
                  // this.mdSrv.onSearch.next(this.filter.nativeElement.value);
                  ins.closeDialog.next();
                }
              });
            });
          });//promise
        };//showDialogAsync

        dialogTransAsync().then(showDialogAsync);

      }
    };
    this.advanceMenuItems.push(uploadCategoryMenuItem);
  }//constructor

}
