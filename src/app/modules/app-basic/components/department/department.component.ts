import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { DepartmentService } from '@geek/micro-app-basic';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { V1ListViewPageBase } from '@geek/apps-base';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Department';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: DepartmentService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
