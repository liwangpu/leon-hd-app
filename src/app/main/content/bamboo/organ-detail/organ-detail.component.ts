import { Component, OnInit } from '@angular/core';
import { Organization } from "../../../toolkit/models/organization";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';
import { ActivatedRoute } from "@angular/router";
import { OrganService } from "../../../toolkit/server/webapi/organ.service";
import { SnackbarService } from "../../../toolkit/common/services/snackbar.service";
import { DepartmentService } from "../../../toolkit/server/webapi/department.service";
import { Department } from '../../../toolkit/models/department';
import { Account } from '../../../toolkit/models/account';
import { AccountService } from '../../../toolkit/server/webapi/account.service';
import { DatePipe } from "@angular/common";
import { MomentService } from "../../../toolkit/common/services/moment.service";
import { TranslateService } from '@ngx-translate/core';
import { AccountTypeEnums } from '../../../toolkit/enums/enums';
@Component({
  selector: 'app-organ-detail',
  templateUrl: './organ-detail.component.html',
  styleUrls: ['./organ-detail.component.scss'],
  animations: fuseAnimations
})
export class OrganDetailComponent implements OnInit {
  organ: Organization;
  pageType = 'new';
  organForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private organSrv: OrganService, private snackbarSrv: SnackbarService, private departmentSrv: DepartmentService, private accountSrv: AccountService, private momentSrv: MomentService, private tranSrv: TranslateService) {
    this.organForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      mail: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
    let tmp = this.route.snapshot.data.entity;
    this.organ = tmp ? tmp : new Organization();
    if (this.organ && this.organ.id)
      this.organForm.patchValue(this.organ);
  }

  saveOrgan() {
    let saveOrgnAsync = () => {
      return new Promise((resolve, reject) => {
        this.organSrv.update(this.organForm.value).first().subscribe(resOrgan => {
          this.organ = resOrgan;
          this.organForm.patchValue(resOrgan);
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          resolve({ k: 'message.OperationError', v: { value: err } });
        });
      });
    };//saveOrgnAsync

    let transAsync = (msgObj: { k: string, v: any }) => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get(msgObj.k, msgObj.v).first().subscribe(msg => {
          resolve(msg);
        });
      });
    };//transAsync

    saveOrgnAsync().then(transAsync).then((msg: string) => {
      this.snackbarSrv.simpleBar(msg);
    });
  }//saveOrgan

}
