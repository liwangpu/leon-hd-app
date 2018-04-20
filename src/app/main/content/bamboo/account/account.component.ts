import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// import { ContactsService } from './contacts.service';
import { fuseAnimations } from '../../../../core/animations';
import { FormControl, FormGroup } from '@angular/forms';
// import { FuseContactsContactFormDialogComponent } from './contact-form/contact-form.component';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
import { AccountDetailComponent } from "./account-detail/account-detail.component";
import { Account } from "../../../toolkit/models/account";
import { AccountTypeEnums } from '../../../toolkit/enums/enums';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AccountComponent implements OnInit {
  dialogRef: any;
  selectedDepId = 'all';
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  newAccount() {
    let account = new Account();
    account.type = AccountTypeEnums.user;
    let dial = this.dialog.open(AccountDetailComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        account: account
      }
    });

    const obs = dial.componentInstance.onSave.subscribe((res) => {

    });
    dial.afterClosed().subscribe(() => {
      obs.unsubscribe();
    });
  }

  onDepartmentSelect(depId) {
    this.selectedDepId = depId;
    console.log(1, 'dep select', depId);



  }//onDepartmentSelect

}
