import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../toolkit/server/webapi/layout.service';

@Component({
  selector: 'app-layout-detail',
  templateUrl: './layout-detail.component.html',
  styleUrls: ['./layout-detail.component.scss']
})
export class LayoutDetailComponent implements OnInit {

  constructor(public apiSrv: LayoutService) { }

  ngOnInit() {
  }

}
