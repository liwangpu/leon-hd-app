import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogFactoryService, AsyncHandleService } from 'scaffold-app-minor';
import { DetailEditorInteractService, DetailBasicEditorExBase } from 'scaffold-page-plate';
import { MemberHierarchyParamService } from 'micro-dmz-oms';

@Component({
  selector: 'app-member-hierarchy-param-setting-ex',
  templateUrl: './member-hierarchy-param-setting-ex.component.html',
  styleUrls: ['./member-hierarchy-param-setting-ex.component.scss']
})
export class MemberHierarchyParamSettingExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected dialogSrv: DialogFactoryService, protected apiSrv: MemberHierarchyParamService, protected asyncHandleSrv: AsyncHandleService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      memberHierarchyParamId: [],
      rate: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataRefershSubject$.subscribe(data => {
      if (!data) return;
      this.apiSrv.getHierarchySetting(data.id).subscribe(setting => {
        this.detailForm.patchValue(setting);
      });//subscribe
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  submit() {
    let data = this.detailForm.value;
    let source$ = this.apiSrv.updateHierarchySetting(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe();
    // console.log(123, data);
  }//submit
}
