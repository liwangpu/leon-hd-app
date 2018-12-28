import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaTypeService } from '@geek/micro-dmz-hd';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from '@geek/apps-base';
import { AsyncHandleService } from '@geek/scaffold-app-minor';

@Component({
  selector: 'app-area-type',
  templateUrl: './area-type.component.html',
  styleUrls: ['./area-type.component.scss']
})
export class AreaTypeComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'AreaType';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: AreaTypeService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
