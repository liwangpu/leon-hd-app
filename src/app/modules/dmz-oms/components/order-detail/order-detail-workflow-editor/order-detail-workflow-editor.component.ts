import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailEditorInteractService, SimpleConfirmMessageDialogComponent } from 'scaffold-page-plate';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';
import { Subject, concat } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { WorkFlowItem, WorkFlow, AccountService, Account } from 'micro-app-basic';
import { AppCacheService } from 'scaffold-app-core';
import { OrderDetailFlowRejectFormComponent } from '../order-detail-flow-reject-form/order-detail-flow-reject-form.component';
import { OrderFlowLog, OrderService, Order } from 'micro-dmz-oms';

@Component({
  selector: 'app-order-detail-workflow-editor',
  templateUrl: './order-detail-workflow-editor.component.html',
  styleUrls: ['./order-detail-workflow-editor.component.scss']
})
export class OrderDetailWorkflowEditorComponent implements OnInit, OnDestroy {

  hasOperatePermission = false;
  hideReject = false;
  operateWorkFlowItemId: string;
  operateWorkFlowItemName: string;
  currentOrderId: string;
  currentWorkFlowItemId: string;
  currentWorkFlowItemName: string;
  currentUserRoleIds: Array<string> = [];
  workFowItems: Array<WorkFlowItem> = [];
  workFlowLogs: Array<OrderFlowLog> = [];
  destroy$ = new Subject();
  constructor(protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected dialogSrv: DialogFactoryService, protected orderSrv: OrderService, protected accountSrv: AccountService, protected cacheSrv: AppCacheService) {

  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).subscribe((order: Order) => {
      if (!order) return;
      this.currentWorkFlowItemId = order.workFlowItemId;
      this.currentWorkFlowItemName = order.workFlowItemName;
      this.currentOrderId = order.id;
      this.workFlowLogs = order.orderFlowLogs;
      // console.log('0 order:', order, this.workFlowLogs);
    });


    let userRole$ = this.accountSrv.getById(this.cacheSrv.userId).pipe(tap((acc: Account) => {
      this.currentUserRoleIds = acc.additionRoles ? acc.additionRoles.map(x => x.userRoleId) : [];
      // console.log(1, this.currentUserRoleIds);
    }));

    let orderFlow$ = this.orderSrv.getOrganOrderFlow().pipe(tap((workFlow: WorkFlow) => {
      if (!workFlow) return;
      this.workFowItems = workFlow.workFlowItems ? workFlow.workFlowItems : [];
      // console.log(2, this.workFowItems);
    }));

    concat(userRole$, orderFlow$).subscribe(() => {
      this.prepareWorkFlowOperate();
    });
  }//ngOnInit

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  prepareWorkFlowOperate() {
    if (!this.workFowItems || this.workFowItems.length <= 0) return;
    let opFlowItem: WorkFlowItem;
    if (!this.currentWorkFlowItemId) {
      opFlowItem = this.workFowItems.filter(x => x.flowGrade <= 0)[0];
    }
    else {
      opFlowItem = this.workFowItems.filter(x => x.id == this.currentWorkFlowItemId)[0];
    }

    //如果当前的流程是最后的流程,按钮不再显示
    let isLastOpFlowItem = this.workFowItems.filter(x => x.flowGrade > opFlowItem.flowGrade).length <= 0;
    if (isLastOpFlowItem) {
      this.hasOperatePermission = false;
      return;
    }

    //判断是否有权限操作该流程
    for (let idx = this.currentUserRoleIds.length - 1; idx >= 0; idx--) {
      let rid = this.currentUserRoleIds[idx];
      this.hasOperatePermission = opFlowItem.operateRoles.indexOf(rid) > -1;
      if (this.hasOperatePermission)
        break;
    }
    if (!this.hasOperatePermission) return;
    this.operateWorkFlowItemId = opFlowItem.id;
    this.operateWorkFlowItemName = opFlowItem.name;
    this.hideReject = opFlowItem.flowGrade <= 0;
  }//prepareWorkFlowOperate

  orderAudit() {
    let dialogRef = this.dialogSrv.open(SimpleConfirmMessageDialogComponent, {
      width: '450px',
      height: '300px',
      disableClose: true,
      data: {
        message: 'message.WorkFlowOperateConfirm',
        param: this.operateWorkFlowItemName
      }
    });

    dialogRef.componentInstance.afterConfirm$.subscribe(() => {
      let data = {
        orderId: this.currentOrderId,
        workFlowItemId: this.operateWorkFlowItemId,
        approve: true
      };
      this.commitAudit(data).subscribe(() => {
        dialogRef.close();
      });
    });//subscribe
  }//orderAudit

  orderReject() {
    let dialogRef = this.dialogSrv.open(OrderDetailFlowRejectFormComponent, {
      width: '450px',
      height: '300px',
      disableClose: true
    });

    dialogRef.componentInstance.afterRefreshData.subscribe((form: { remark: string }) => {
      let data = {
        orderId: this.currentOrderId,
        workFlowItemId: this.operateWorkFlowItemId,
        remark: form.remark,
        approve: false
      };
      this.commitAudit(data).subscribe(() => {
        dialogRef.close();
      });
    });//subscribe
  }//orderAudit

  commitAudit(data: any) {
    let source$ = this.orderSrv.auditOrder(data);
    return this.asyncHandleSrv.asyncRequest(source$).pipe(tap((order: Order) => {
      this.currentWorkFlowItemId = order.workFlowItemId;
      this.currentWorkFlowItemName = order.workFlowItemName;
      this.workFlowLogs = order.orderFlowLogs;
      this.interactSrv.basicExDataChange$.next(order);
      this.prepareWorkFlowOperate();
    }));
  }//commitAudit
}
