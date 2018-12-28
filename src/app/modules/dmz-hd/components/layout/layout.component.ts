import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from '@geek/apps-base';
import { LayoutService } from '@geek/micro-dmz-hd';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Layout';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: LayoutService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
