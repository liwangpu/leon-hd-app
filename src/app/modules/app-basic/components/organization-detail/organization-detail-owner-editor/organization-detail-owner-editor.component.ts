import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';
import { OrganizationService, AccountService, Organization, Account } from 'micro-app-basic';
import { OrganizationDetailOwnerResetpasswordFormComponent } from '../organization-detail-owner-resetpassword-form/organization-detail-owner-resetpassword-form.component';

@Component({
  selector: 'app-organization-detail-owner-editor',
  templateUrl: './organization-detail-owner-editor.component.html',
  styleUrls: ['./organization-detail-owner-editor.component.scss']
})
export class OrganizationDetailOwnerEditorComponent implements OnInit, OnDestroy {

  mailPersistent: boolean;
  ownerId: string;
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected organSrv: OrganizationService, protected accountSrv: AccountService, protected dialogSrv: DialogFactoryService) {
    this.detailForm = this.formBuilder.group({
      id: [],
      isAdmin: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      mail: ['', [Validators.required, Validators.maxLength(50)]],
      activationTime: [''],
      expireTime: [''],
      phone: ['', [Validators.maxLength(50)]],
      location: ['', [Validators.maxLength(200)]],
      department: ['']
    });
  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((organ: Organization) => {
      if (!organ) return;
      this.detailForm.patchValue({
        activationTime: organ.activationTime,
        expireTime: organ.expireTime
      });
      this.organSrv.getOwner(organ.id).subscribe(owner => {
        this.detailForm.patchValue(owner);
        this.ownerId = owner.id;
        this.mailPersistent = owner.mail ? true : false;
      });//subscribe
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnInit

  submitOwner() {
    let data = this.detailForm.value;
    let source$ = this.accountSrv.update(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe((acc: Account) => {
      if (!acc) return;
      this.mailPersistent = acc.mail ? true : false;
    });
  }//submitOwner

  resetPassword() {
    let dialogRef = this.dialogSrv.open(OrganizationDetailOwnerResetpasswordFormComponent, {
      width: '400px',
      height: '300px',
      disableClose: true,
      data: {
        userId: this.ownerId
      }
    });

    dialogRef.componentInstance.afterChangePassword$.subscribe(() => {
      dialogRef.close();
    });
  }//resetPassword
}
