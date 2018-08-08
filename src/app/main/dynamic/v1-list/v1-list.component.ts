import { Component, OnInit } from '@angular/core';
import { V1DyListPageTplsComponent } from '../../../share/common/page-tpls/v1-dy-list-page-tpls/v1-dy-list-page-tpls.component';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ResourceService } from '../../../share/services/webapis/resource.service';
import { V1ListPageScheduleService } from '../../../share/common/page-tpls/v1-dy-list-page-tpls/v1-list-page-schedule.service';

@Component({
  selector: 'app-v1-list',
  templateUrl: './v1-list.component.html',
  styleUrls: ['./v1-list.component.scss'],
  providers: [V1ListPageScheduleService, ResourceService]
})
export class V1ListComponent extends V1DyListPageTplsComponent implements OnInit {

  constructor(protected route: ActivatedRoute, protected resourceSrv: ResourceService, protected scheduleSrv: V1ListPageScheduleService) {
    super(route, resourceSrv, scheduleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
