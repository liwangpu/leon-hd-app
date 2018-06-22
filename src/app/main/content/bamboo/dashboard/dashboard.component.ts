import { Component, OnInit } from '@angular/core';
import { CommonSearchDemoMdService } from './common-search-demo-md.service';
import { GroupListMaterialMapsDialogMdService } from '../package-detail/group-detail-list/group-list-material-maps-dialog-tpls/group-list-material-maps-dialog-md.service';
import { IQueryFilter } from '../../../toolkit/common/interfaces/iqueryFilter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CommonSearchDemoMdService]
})
export class DashboardComponent implements OnInit {

  constructor(public mdSrv: CommonSearchDemoMdService) {

  }

  ngOnInit() {
  }//


}
