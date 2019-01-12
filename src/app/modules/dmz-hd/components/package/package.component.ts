import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from 'micro-dmz-hd';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from 'scaffold-app-core'; import { AsyncHandleService } from 'scaffold-app-minor';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Package';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: PackageService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}