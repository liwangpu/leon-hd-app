import { Component, OnInit } from "@angular/core";
import { MapMdService } from "./map-md.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapMdService]
})
export class MapComponent implements OnInit {

  constructor(public mdSrv: MapMdService) { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy


}
