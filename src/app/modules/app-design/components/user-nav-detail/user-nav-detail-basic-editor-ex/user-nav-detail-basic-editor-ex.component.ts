import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { UserNav, UserRoleService, UserRole } from 'micro-app-basic';

@Component({
  selector: 'app-user-nav-detail-basic-editor-ex',
  templateUrl: './user-nav-detail-basic-editor-ex.component.html',
  styleUrls: ['./user-nav-detail-basic-editor-ex.component.scss']
})
export class UserNavDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  defaultRoleId: string;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, public roleSrv: UserRoleService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: []
      , roleId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataRefershSubject$.subscribe((data: UserNav) => {
      this.defaultRoleId = data.roleId;
      this.detailForm.patchValue(data);
    });//subscribe

    //默认查询一些子流程作为默认选项
    // this.searchUserRole();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  afterUserRoleSelect(item: UserRole) {
    this.detailForm.patchValue({ roleId: item.id });
  }//afterUserRoleSelect

  afterUserRoleClear() {
    this.detailForm.patchValue({ roleId: undefined });
  }//afterUserRoleClear
}
