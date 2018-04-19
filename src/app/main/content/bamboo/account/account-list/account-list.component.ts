import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs/Observable';
// import { FuseContactsContactFormDialogComponent } from '../contact-form/contact-form.component';
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
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AccountListComponent implements OnInit {
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;
  @ViewChild(MatSort) sort: MatSort;
  contacts: any;
  user: any;
  dataSource: PaginatorStore<Account> | null;
  displayedColumns = ['checkbox', 'avatar', 'name', 'email', 'phone', 'jobTitle', 'buttons'];
  selectedContacts: any[];
  checkboxes: {};

  onContactsChangedSubscription: Subscription;
  onSelectedContactsChangedSubscription: Subscription;
  onUserDataChangedSubscription: Subscription;

  dialogRef: any;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(private accountSrv: AccountService) { }

  ngOnInit() {
    this.dataSource = new PaginatorStore({ service: this.accountSrv, sort: this.sort });
  }

}
