import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { DepartmentService, Department, Account } from 'micro-app-basic';

@Component({
  selector: 'app-account-detail-basic-editor-ex',
  templateUrl: './account-detail-basic-editor-ex.component.html',
  styleUrls: ['./account-detail-basic-editor-ex.component.scss']
})
export class AccountDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  curDepartmentId: string;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, public departmentSrv: DepartmentService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: []
      , departmentId: ['']
      , activationTime: ['', [Validators.required]]
      , expireTime: ['', [Validators.required]]
      , mail: ['', [Validators.required, Validators.maxLength(50)]]
      , phone: ['', [Validators.maxLength(50)]]
      , location: ['', [Validators.maxLength(150)]]
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataRefershSubject$.subscribe((data: Account) => {
      this.detailForm.patchValue(data);
      this.curDepartmentId = data.departmentId;
    });//
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  onDepartmentSelected(item: Department) {
    this.detailForm.patchValue({
      departmentId: item.id
    });
  }//onDepartmentSelected

  onDepartmentClear() {
    this.detailForm.patchValue({
      departmentId: ''
    });
  }//onDepartmentClear

}

