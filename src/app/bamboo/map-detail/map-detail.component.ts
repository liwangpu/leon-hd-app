import { Component, OnInit } from '@angular/core';
import { MapService } from '../../share/services/webapis/map.service';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.scss']
})
export class MapDetailComponent implements OnInit {

  constructor(public apiSrv: MapService) { }

  ngOnInit() {
  }

}
