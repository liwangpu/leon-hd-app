import { Component, OnInit, Input } from '@angular/core';
import { ListDisplayModeEnum } from '../paginator-refers';
import { Subject } from 'rxjs';
import { PaginatorCommonMdService } from '../paginator-common-md.service';
import { DialogFactoryService } from '../../../factories/dialog-factory.service';
import { SimpleMessageContentComponent } from '../../../factories/dialog-template/simple-message-content/simple-message-content.component';
import { AsyncHandleService } from '../../../../services/common/async-handle.service';

@Component({
  selector: 'app-paginator-page-manage-buttons',
  templateUrl: './page-manage-buttons.component.html',
  styleUrls: ['./page-manage-buttons.component.scss']
})
export class PageManageButtonsComponent implements OnInit {

  @Input() dataDisplayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;//列表数据显示模式 列表或卡片等等
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PaginatorCommonMdService, protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService) {

  }//


  ngOnInit() {

  }//

  modeChange() {
    this.mdSrv.selectMode = !this.mdSrv.selectMode;
  }//modeChange

  displayModeChange(num: number) {
    this.mdSrv.displayMode = num;
  }//displayModeChange

  isButtonEnable(needPermission?: boolean): boolean {
    if (needPermission) {
      if (!this.mdSrv.readDataOnly)
        return true;
    }
    return true;
  }
  refresh() {
    this.mdSrv.queryData$.next();
  }//refresh

  /**
   * 批量删除
   */
  batchDelete() {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.BatchDeleteConfirm', value: { value: this.mdSrv.selectedItems.length } }, 'tips.Prompt');

    dialog.afterOpen().subscribe(() => {
      let ins = (dialog.componentInstance.componentIns as SimpleMessageContentComponent);
      ins.afterConfirm.subscribe(() => {
        let source$ = this.mdSrv.apiSvr.batchDelete(this.mdSrv.selectedItems);
        this.asyncHandle.asyncRequest(source$).subscribe(_ => {
          this.mdSrv.queryData$.next();
          this.mdSrv.selectedItems = [];
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//open

  }//batchDelete

  /**
   * 导出数据
   */
  exportData() {
    this.mdSrv.exportData();
  }//exportData
}
