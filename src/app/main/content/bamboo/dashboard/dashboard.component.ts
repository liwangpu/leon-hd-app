import { Component, OnInit } from '@angular/core';
import { CommonSearchDemoMdService } from './common-search-demo-md.service';

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
