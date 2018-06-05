import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorLaunch, IListTableColumn, IAdvanceMenuItem } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { IListableService } from '../../../toolkit/server/webapi/ilistableService';
import { Material } from '../../../toolkit/models/material';
import { DatePipe } from '@angular/common';
import { MaterialService } from '../../../toolkit/server/webapi/material.service';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangeCategorySuitComponent } from './change-category-suit/change-category-suit.component';
import { SimpleCsvUploadComponent } from '../../../toolkit/common/factory/dialog-template/simple-csv-upload/simple-csv-upload.component';

@Injectable()
export class MaterialMdService extends PaginatorLaunch {

  createdUrl = 'app/material-detail';
  titleIcon = 'healing';
  title = 'glossary.Material';
  onSelectMode: Subject<boolean> = new Subject();//选择模式D
  anyItemSelected: Subject<boolean> = new Subject();//列表至少有一个选择
  multipleSelect: Subject<boolean> = new Subject();//列表有/无选择
  onSelectCategory: Subject<string> = new Subject();//选择分类触发事件
  onSearch: Subject<string> = new Subject();//关键字搜索触发事件
  changeCategoryItems: Subject<void> = new Subject();//改变材料分类
  columnDefs: Array<IListTableColumn<Material>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Material) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Material) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Material) => data.description ? data.description : '' }
    , { columnDef: 'categoryName',_columnDef:'categoryId', header: 'glossary.Category', width: 80, cell: (data: Material) => data.categoryName ? data.categoryName : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Material) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: MaterialService, protected dialogFac: DialogFactoryService,protected tranSrv: TranslateService) {
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
            let dialog = this.dialogFac.simpleCsvUpload(title, { width: '450px', height: '550px', uploadUrl: 'material/ImportMaterialAndCategory', templateCsvUrl: 'material/MaterialAndCategoryImportTemplate' });
            dialog.afterOpen().first().subscribe(() => {
              let ins = (dialog.componentInstance.componentIns as SimpleCsvUploadComponent);
              ins.doneAsync.subscribe((state) => {
                if (state) {
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
