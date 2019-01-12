import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";
import { MemberRegistryService, MemberRegistry } from 'micro-dmz-oms';
import { MatButton } from '@angular/material';


@Component({
  selector: 'app-member-registry-detail',
  templateUrl: './member-registry-detail.component.html',
  styleUrls: ['./member-registry-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class MemberRegistryDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  currentMemberId: string;
  resource = 'MemberRegistry';
  @ViewChild('approveBtnCt') approveBtnCt: MatButton;
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: MemberRegistryService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    this.interactSrv.afterDataRefresh$.subscribe((data: MemberRegistry) => {
      if (!data) return;
      this.currentMemberId = data.id;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  approveMember() {
    this.approveBtnCt.disabled = true;
    let data = {
      id: this.currentMemberId
    };
    let source$ = this.apiSrv.approveRegistry(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(() => { }, err => {
      this.approveBtnCt.disabled = false;
    });
  }//approveMember

}
