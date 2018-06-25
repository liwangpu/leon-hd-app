import { Injectable, OnDestroy } from '@angular/core';
import { SimpleTableListBase } from '../common/simple-table-list/simple-table-list.component';
import { DatePipe } from '@angular/common';
import { AccountService } from '../../../toolkit/server/webapi/account.service';
import { Ilistable } from '../../../toolkit/models/ilistable';
import { Account } from '../../../toolkit/models/account';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountMdService } from './account-md.service';
import { SimpleMessageContentComponent } from '../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';
import { AsyncHandleService } from '../../services/async-handle.service';
import { IQueryFilter } from '../../../toolkit/common/interfaces/iqueryFilter';

@Injectable()
export class AccountListMdService extends SimpleTableListBase implements OnDestroy {

  constructor(protected datePipeTr: DatePipe, public apiSrv: AccountService, protected dialogFac: DialogFactoryService, protected mdSrv: AccountMdService, private asyncHandle: AsyncHandleService) {
    super(datePipeTr);

    this.columnDefs = [
      { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Account) => data.icon ? data.icon : '' }
      , { columnDef: 'name', header: 'glossary.Name', width: 85, cell: (data: Account) => data.name ? data.name : '' }
      , { columnDef: 'mail', header: 'glossary.Mail', width: 85, cell: (data: Account) => data.mail ? data.mail : '' }
      , { columnDef: 'activationTime', header: 'glossary.ActivationTime', width: 100, cell: (data: Account) => data.activationTime ? this.datePipeTr.transform(data.activationTime, 'yyyy-MM-dd') : '' }
      , { columnDef: 'expireTime', header: 'glossary.ExpireTime', width: 0, cell: (data: Account) => data.expireTime ? this.datePipeTr.transform(data.expireTime, 'yyyy-MM-dd') : '' }
      , { columnDef: 'accountType', header: 'glossary.AccountType', width: 85, cell: (data: Account) => data.isAdmin ? 'glossary.Admin' : 'glossary.Member', translate: true }
      , { columnDef: 'departmentName', header: 'glossary.Department', width: 85, cell: (data: Account) => data.departmentName ? data.departmentName : '' }
      , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Account) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
      , { columnDef: 'button', header: 'glossary.Manage', width: 50, cell: (data: Ilistable) => `${data.seqno}` }
    ];

    this.itemManageMenu = {
      icon: 'more_horiz',
      name: '',
      items: [
        { icon: 'edit', name: 'button.Edit', click: (data: Ilistable) => { this.editAccount(data as Account) } }
        , { icon: 'delete', name: 'button.Delete', click: (data: Ilistable) => { this.deleteAccount(data as Account) } }
      ],

    };

    this.mdSrv.afterAccountChange.subscribe(_ => {
      this.refreshData();
    });
    this.mdSrv.afterDepartmentChange.subscribe(departmentId => {
      this.onDepartmentChange(departmentId);
    });
  }//constructor

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  editAccount(acc: Account) {
    let dialog = this.dialogFac.tplsConfirm(AccountDetailComponent, 'dialog.EditAccount', { width: '450px', height: '700px', data: { account: acc } });
    dialog.afterOpen().subscribe(_ => {
      let ins = dialog.componentInstance.componentIns as AccountDetailComponent;
      ins.afterAccountChange.takeUntil(this.destroy$).subscribe(_ => {
        this.afterDataChange$.next();
      });
    });
  }//editAccount

  deleteAccount(acc: Account) {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: acc.name } }, 'dialog.DeleteAccount');
    dialog.afterOpen().subscribe(_ => {
      let ins = dialog.componentInstance.componentIns as SimpleMessageContentComponent;
      ins.afterConfirm.subscribe(_ => {
        let source$ = this.apiSrv.delete(acc.id);
        this.asyncHandle.asyncRequest(source$).subscribe(_ => {
          this.afterDataChange$.next();
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//afterOpen
  }//deleteAccount

  onDepartmentChange(departmentId?: string) {
    let query: Array<IQueryFilter> = [
      { field: 'departmentId', value: departmentId },
      { field: 'ignoreOwner', value: 'true' }
    ];
    this.advanceQuery(query);
  }//onDepartmentChange

}
