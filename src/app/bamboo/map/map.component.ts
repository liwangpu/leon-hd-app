import { Component, OnInit } from '@angular/core';
import { MapPaginatorLaunchService } from './map-paginator-launch.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers:[MapPaginatorLaunchService]
})
export class MapComponent implements OnInit {

  constructor(public launch: MapPaginatorLaunchService) { }

  ngOnInit() {
  }

}
