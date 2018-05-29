import { Component, OnInit, Input } from '@angular/core';
import { PaginatorCommonMdService } from '../paginator-common-md.service';
import { Subject } from 'rxjs';
import { ListDisplayModeEnum } from '../paginator-common-tpls.component';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { BatchDeleteConfirmTplsComponent } from './batch-delete-confirm-tpls/batch-delete-confirm-tpls.component';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../../toolkit/common/services/snackbar.service';

@Component({
  selector: 'app-paginator-page-manage-button',
  templateUrl: './page-manage-button.component.html',
  styleUrls: ['./page-manage-button.component.scss']
})
export class PageManageButtonComponent implements OnInit {
  readDataOnly: boolean;//只读数据,不显示数据操作按钮
  @Input() dataDisplayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;//列表数据显示模式 列表或卡片等等
  destroy$: Subject<boolean> = new Subject();
  constructor(public mdSrv: PaginatorCommonMdService, protected dialogFac: DialogFactoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService) {

    //订阅列表数据编辑模式 true=>只读模式
    this.mdSrv.readDataOnly$.takeUntil(this.destroy$).subscribe(readDataMode => {
      this.readDataOnly = readDataMode;
    });//
  }//

  ngOnInit() {

  }//

  modeChange() {
    this.mdSrv.selectMode = !this.mdSrv.selectMode;
  }//modeChange

  displayModeChange(num: number) {
    this.mdSrv.displayMode = num;
  }//displayModeChange

  refresh() {
    this.mdSrv.queryData$.next();
  }//refresh

  batchDelete() {
    let ins: BatchDeleteConfirmTplsComponent;
    let transAsync = () => {
      return new Promise((resolve) => {
        this.tranSrv.get('message.BatchDeleteConfirm', this.mdSrv.selectedItems.length).subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    let deleteAsync = (tip) => {
      return new Promise((resolve) => {
        let dialog = this.dialogFac.tplsConfirm(BatchDeleteConfirmTplsComponent, '', { width: '400px', height: '250px' });
        dialog.afterOpen().first().subscribe(() => {
          ins = (dialog.componentInstance.componentIns as BatchDeleteConfirmTplsComponent);
          ins.msg = tip as string;
          ins.afterConfirm.first().subscribe(() => {
            this.mdSrv.apiSvr.batchDelete(this.mdSrv.selectedItems).first().subscribe(() => {
              this.mdSrv.queryData$.next();
              this.mdSrv.selectedItems = [];
              resolve({ k: 'message.DeleteSuccessfully' });
            }, err => {
              resolve({ k: 'message.OperationError', v: { value: err } });
            });
          });//afterConfirm
        });//open
      });//promise  
    };

    let trans2Async = (mobj: { k: string, v: any }) => {
      return new Promise((resolve) => {
        this.tranSrv.get(mobj.k, mobj.v).subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    transAsync().then(deleteAsync).then(trans2Async).then(msg => {
      this.snackBarSrv.simpleBar(msg as string);
      ins.doneAsync.next();
      ins.closeDialog.next();
    });

  }//batchDelete

}
