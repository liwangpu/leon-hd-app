
import { MapService } from '../../../toolkit/server/webapi/map.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.scss']
})
export class MapDetailComponent implements OnInit {

  constructor(public apiSrv: MapService) {

  }//constructor

  ngOnInit() {
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

}
