import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { V1DetailEditorPageBase } from 'apps-base';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncHandleService } from 'scaffold-app-minor';
import { MemberHierarchyParamService } from 'micro-dmz-oms';
import { MemberHierarchyParamSettingExComponent } from './member-hierarchy-param-setting-ex/member-hierarchy-param-setting-ex.component';

@Component({
  selector: 'app-member-hierarchy-param-detail',
  templateUrl: './member-hierarchy-param-detail.component.html',
  styleUrls: ['./member-hierarchy-param-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class MemberHierarchyParamDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'MemberHierarchyParam';
  @ViewChild('settingExRefCt') settingExRefCt: MemberHierarchyParamSettingExComponent;
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: MemberHierarchyParamService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  submitSetting() {
    // alert(5);
    this.settingExRefCt.submit();
  }//submitSetting

}
