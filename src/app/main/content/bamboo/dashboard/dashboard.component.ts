import { Component, OnInit } from '@angular/core';
import { CommonSearchDemoMdService } from './common-search-demo-md.service';
import { GroupListMaterialMapsDialogMdService } from '../package-detail/group-detail-list/group-list-material-maps-dialog-tpls/group-list-material-maps-dialog-md.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[GroupListMaterialMapsDialogMdService]
})
export class DashboardComponent implements OnInit {

  constructor(public mdSrv: GroupListMaterialMapsDialogMdService) { 
    
  }

  ngOnInit() {
  }

}
