import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { StaticmeshService } from 'micro-dmz-hd';
import { AsyncHandleService } from 'scaffold-app-minor';


@Component({
  selector: 'app-staticmesh',
  templateUrl: './staticmesh.component.html',
  styleUrls: ['./staticmesh.component.scss']
})
export class StaticmeshComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'StaticMesh';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: StaticmeshService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
