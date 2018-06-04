import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MatDialog } from '@angular/material';
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { DepartmentFormComponent } from "../department-form/department-form.component";
import { DepartmentService } from "../../../../toolkit/server/webapi/department.service";
import { Department } from "../../../../toolkit/models/department";
import { DessertService } from "../../../services/dessert.service";
import { DialogService } from "../../../../toolkit/common/services/dialog.service";
import { TranslateService } from '@ngx-translate/core';
import { AccountMdService } from '../account-md.service';
@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss']
})
export class DepartmentCardComponent implements OnInit {

  filterBy = 'all';
  dialogRef: any;
  departments: Array<Department> = [];
  constructor(private snackBarSrv: SnackbarService, public dialog: MatDialog, private departmentSrv: DepartmentService, private dessertSrv: DessertService, private dialogSrv: DialogService, private transSrv: TranslateService, private accountMdSrv: AccountMdService) { }

  ngOnInit() {
    this.getAllDepartment();
  }

  /**
   * 过滤部门人员信息
   * @param filter 
   */
  changeFilter(depId: string) {
    this.filterBy = depId;
    this.accountMdSrv.selectedDepartment = depId;
    this.accountMdSrv.afterDepartmentChange.next(depId);
    // this.onSelected.next(filter);
  }//changeFilter

  /**
   * 获取所有部门信息
   */
  getAllDepartment() {
    this.departmentSrv.getByOrgan(this.dessertSrv.organId).subscribe(res => {
      this.departments = res;
    });
  }//getAllDepartment


  /**
   * 编辑部门信息
   * @param depId 
   */
  editDepartment(depId?: string) {
    let ndepartment = new Department();
    if (depId)
      ndepartment = this.departments.filter(x => x.id == depId)[0];
    ndepartment.organizationId = this.dessertSrv.organId;
    let ndialog = this.dialog.open(DepartmentFormComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        department: ndepartment
      }
    });

    const onSaveDepartmetnObs = ndialog.componentInstance.onSave.subscribe(res => {
      this.getAllDepartment();
    });

    ndialog.afterClosed().subscribe(() => {
      onSaveDepartmetnObs.unsubscribe();
    });
  }//editDepartment

  /**
   * 删除部门信息
   * @param depId 
   * @param depName 
   */
  deleteDepartment(depId: string, depName: string) {
    let confirmPro = () => {
      return new Promise((resolve, reject) => {
        this.transSrv.get('message.DeleteConfirm', { value: depName }).subscribe((msg) => {
          let dial = this.dialogSrv.confirmDialog(msg);
          const obs = dial.componentInstance.onConfirm.first().subscribe(() => {
            resolve();
          });
          dial.afterClosed().first().subscribe(() => {
            obs.unsubscribe();
          });
        });
      });
    };//confirmPro

    let deletePro = () => {
      return new Promise((resolve, reject) => {
        this.departmentSrv.delete(depId).first().subscribe(() => {
          resolve();
        }, err => {
          reject(err);
        });
      });
    };//deletePro

    confirmPro().then(deletePro).then(() => {
      this.transSrv.get('message.DeleteSuccessfully').first().subscribe(msg => {
        this.getAllDepartment();
        this.snackBarSrv.simpleBar(msg);
      });
    }).catch(err => {
      this.transSrv.get('message.DeleteError', { value: err }).subscribe(msg => {
        this.snackBarSrv.simpleBar(msg);
      });
    });

  }//deleteDepartment

}
