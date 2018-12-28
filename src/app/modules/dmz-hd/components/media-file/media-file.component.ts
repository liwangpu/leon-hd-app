import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaFileService } from '@geek/micro-dmz-hd';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from '@geek/apps-base';

@Component({
  selector: 'app-media-file',
  templateUrl: './media-file.component.html',
  styleUrls: ['./media-file.component.scss']
})
export class MediaFileComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Share';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: MediaFileService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
