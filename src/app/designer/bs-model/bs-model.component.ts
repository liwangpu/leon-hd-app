import { Component, OnInit } from '@angular/core';
import { V1ListPageScheduleService } from '../../share/common/page-tpls/v1-dy-list-page-tpls/v1-list-page-schedule.service';
import { ResourceService } from '../../share/services/webapis/resource.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { V1DyListPageTplsComponent } from '../../share/common/page-tpls/v1-dy-list-page-tpls/v1-dy-list-page-tpls.component';

@Component({
  selector: 'app-bs-model',
  templateUrl: './bs-model.component.html',
  styleUrls: ['./bs-model.component.scss'],
  providers: [V1ListPageScheduleService, ResourceService]
})
export class BsModelComponent extends V1DyListPageTplsComponent implements OnInit {

  constructor(protected route: ActivatedRoute, protected resourceSrv: ResourceService, protected scheduleSrv: V1ListPageScheduleService) {
    super(route, resourceSrv, scheduleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
