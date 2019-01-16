import { Injectable } from '@angular/core';
// import { PaginatorLaunch, IListTableColumn, IAdvanceMenuItem } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { Subject } from 'rxjs';
// import { Material } from '../../share/models/material';
import { DatePipe } from '@angular/common';
// import { MaterialService } from '../../share/services/webapis/material.service';
// import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';
// import { AsyncHandleService } from '../../share/services/common/async-handle.service';
// import { SimpleCategoryPanelComponent } from '../../share/common/factories/dialog-template/simple-category-panel/simple-category-panel.component';
import { MaterialLeftCategoryLaunchService } from './material-left-category-launch.service';
import { PaginatorLaunch, IListTableColumn, MaterialService, AsyncHandleService, DialogFactoryService, IAdvanceMenuItem, SimpleCategoryPanelComponent, Material } from '@app/app-legacy';
// import { Material } from '@app/app-legacy/models/material';

@Injectable()
export class MaterialPaginatorLaunchService extends PaginatorLaunch {

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
    , { columnDef: 'categoryName', _columnDef: 'categoryId', header: 'glossary.Category', width: 80, cell: (data: Material) => data.categoryName ? data.categoryName : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 110, cell: (data: Material) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: MaterialService, protected dialogFac: DialogFactoryService, protected syncHandle: AsyncHandleService, protected leftCategorySrv: MaterialLeftCategoryLaunchService) {
    super(datePipe, syncHandle, dialogFac);


    let changeCategoryMenuItem: IAdvanceMenuItem = {
      icon: 'swap_horiz', name: 'button.ChangeCategory', needSelected: true, needPermission: true, click: (selectedIds: Array<string>) => {
        let idsStr = selectedIds.join(',');
        let dialog = this.dialogFac.simpleCategorySelect(leftCategorySrv);

        dialog.afterOpen().subscribe(() => {
          let ins: SimpleCategoryPanelComponent = dialog.componentInstance.componentIns;
          ins.afterConfirm.subscribe(() => {
            let source$ = this.apiSrv.bulkChangeCategory(idsStr, ins.selectedCategoryId);
            this.syncHandle.asyncRequest(source$).subscribe(() => {
              ins.doneAsync.next();
              this.refreshData$.next();
              ins.closeDialog.next();
            }, () => {
              ins.doneAsync.next();
            });
          });
        });//afterOpen
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
    //         let dialog = this.dialogFac.simpleCsvUpload(title, { width: '450px', height: '550px', uploadUrl: 'material/ImportMaterialAndCategory', templateCsvUrl: 'material/MaterialAndCategoryImportTemplate' });
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
