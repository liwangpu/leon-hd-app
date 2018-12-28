import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from '@geek/apps-base';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '@geek/micro-dmz-oms';
import { AsyncHandleService } from '@geek/scaffold-app-minor';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class MemberDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  currentMemberId: string;
  resource = 'Member';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: MemberService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    // this.interactSrv.afterDataRefresh$.subscribe((data: Member) => {
    //   if (!data) return;
    //   this.currentMemberId = data.id;
    // });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  approveMember() {
    // this.approveBtnCt.disabled = true;
    // let data = {
    //   id: this.currentMemberId
    // };
    // let source$ = this.apiSrv.approveRegistry(data);
    // this.asyncHandleSrv.asyncRequest(source$).subscribe(() => { }, err => {
    //   this.approveBtnCt.disabled = false;
    // });
  }//approveMember

}