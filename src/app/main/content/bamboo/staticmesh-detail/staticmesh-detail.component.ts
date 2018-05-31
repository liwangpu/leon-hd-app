import { Component, OnInit, OnDestroy } from "@angular/core";
import { StaticmeshService } from "../../../toolkit/server/webapi/staticmesh.service";

@Component({
  selector: 'app-staticmesh-detail',
  templateUrl: './staticmesh-detail.component.html',
  styleUrls: ['./staticmesh-detail.component.scss']
})
export class StaticmeshDetailComponent implements OnInit, OnDestroy {

  constructor(public apiSrv: StaticmeshService) {

  }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

}
