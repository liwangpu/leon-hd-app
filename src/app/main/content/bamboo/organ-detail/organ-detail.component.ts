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
        this.organSrv.update(this.organForm.value).subscribe(resOrgan => {
          resOrgan.departments = this.organ.departments ? this.organ.departments : [];
          resOrgan.owner = this.organ.owner ? this.organ.owner : null;
          this.organ = resOrgan;
          this.organForm.patchValue(resOrgan);
          resolve(resOrgan);
        }, err => {
          reject(err);
        });
      });
    };//saveOrgnAsync

    let createDefaultDepartmentAsync = (resOrgan) => {
      return new Promise((resolve, reject) => {
        if (this.organ.departments && this.organ.departments.length >= 1) {
          resolve(this.organ.departments[0]);
        }
        else {
          let dep = new Department();
          dep.organizationId = resOrgan.id;
          dep.name = resOrgan.name;
          this.departmentSrv.update(dep).subscribe(resDepartment => {
            this.organ.departments = [resDepartment];
            resolve(resDepartment);
          }, err => {
            reject(err);
          });
        }
      });
    };//checkDefaultDepartmentAsync

    let createDefaultOwner = (resDepartment) => {
      return new Promise((resolve, reject) => {
        if (this.organ.owner) {
          resolve({ k: 'message.SaveSuccessfully' });
        }
        else {
          let acc = new Account();
          acc.organizationId = resDepartment.organizationId;
          acc.departmentId = resDepartment.id;
          acc.mail = this.organ.mail;
          acc.password = '1111';
          acc.name = '组织管理员';
          acc.activationTime = this.momentSrv.addDaysTransform(new Date(), -1, 'yyyy-MM-dd');
          acc.expireTime = this.momentSrv.addYearsTransform(new Date(), 10, 'yyyy-MM-dd');
          this.accountSrv.regist(acc).subscribe(resAccount => {
            this.organ.owner = resAccount;
            resolve({ k: 'message.SaveSuccessfully' });
          }, err => {
            reject({ k: 'message.OperationError', v: { value: err } });
          });
        }
      });
    };//createDefaultOwner

    let transAsync = (msgObj: { k: string, v: any }) => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get(msgObj.k, msgObj.v).subscribe(msg => {
          resolve(msg);
        });
      });
    };//transAsync

    saveOrgnAsync().then(createDefaultDepartmentAsync).then(createDefaultOwner).then(transAsync).then((msg: string) => {
      this.snackbarSrv.simpleBar(msg);
    });
  }//saveOrgan

}
