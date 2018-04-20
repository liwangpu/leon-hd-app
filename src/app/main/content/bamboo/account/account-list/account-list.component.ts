import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccountDetailComponent } from "../account-detail/account-detail.component";
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../../core/animations';
import { Subscription } from 'rxjs/Subscription';
import { PaginatorStore } from "../../../../toolkit/common/classes/paginator-store";
import { Account } from "../../../../toolkit/models/account";
import { AccountService } from "../../../../toolkit/server/webapi/account.service";
import { MatSort } from '@angular/material';
import { DessertService } from "../../../services/dessert.service";
import { DialogService } from "../../../../toolkit/common/services/dialog.service";
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { AccountTypeEnums } from '../../../../toolkit/enums/enums';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AccountListComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @Input() departmentId: string;
  dataSource: PaginatorStore<Account> | null;
  displayedColumns = ['icon', 'name', 'phone', 'mail', 'buttons'];
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  constructor(private accountSrv: AccountService, public dialog: MatDialog, private dessertSrv: DessertService, private dialogSrv: DialogService, private transSrv: TranslateService, private snackBarSrv: SnackbarService) { }

  ngOnInit() {
    this.dataSource = new PaginatorStore({ service: this.accountSrv, sort: this.sort });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentId']) {
      console.log(111, 'depId', changes['departmentId']);
    }
  }

  editAccount(acc: Account) {
    this.accountSrv.getById(acc.id).subscribe(rdata => {
      rdata.organizationId = this.dessertSrv.organId;
      rdata.type = AccountTypeEnums.user;
      rdata.name = '用户';
      let ndialog = this.dialog.open(AccountDetailComponent, {
        panelClass: 'contact-form-dialog',
        data: {
          account: rdata
        }
      });

      const onSaveDepartmetnObs = ndialog.componentInstance.onSave.subscribe(res => {
        console.log(111, 'after save acc 222');
        this.dataSource.refresh();
      });

      ndialog.afterClosed().subscribe(() => {
        onSaveDepartmetnObs.unsubscribe();
      });
    });

  }//editAccount

  deleteAccount(acc: Account) {

    let confirmAsync = () => {
      return new Promise((resolve, reject) => {
        this.transSrv.get('message.DeleteConfirm', { value: acc.name }).subscribe((msg) => {
          let dial = this.dialogSrv.confirmDialog(msg);
          const obs = dial.componentInstance.onConfirm.subscribe(() => {
            resolve();
          });
          dial.afterClosed().subscribe(() => {
            obs.unsubscribe();
          });
        });
      });
    };//confirmAsync

    let deleteAsync = () => {
      return new Promise((resolve, reject) => {
        this.accountSrv.delete(acc.id).subscribe(() => {
          resolve();
        }, err => {
          reject(err);
        });
      });
    };//deleteAsync

    confirmAsync().then(deleteAsync).then(() => {
      this.transSrv.get('message.DeleteSuccessfully').subscribe(msg => {
        this.dataSource.refresh();
        this.snackBarSrv.simpleBar(msg);
      });
    }).catch(err => {
      this.transSrv.get('message.DeleteError', { value: err }).subscribe(msg => {
        this.snackBarSrv.simpleBar(msg);
      });
    });

  }//deleteAccount
}
