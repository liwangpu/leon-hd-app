import { Component, OnInit } from '@angular/core';
import { StaticmeshService } from '../../share/services/webapis/staticmesh.service';

@Component({
  selector: 'app-static-mesh-detail',
  templateUrl: './static-mesh-detail.component.html',
  styleUrls: ['./static-mesh-detail.component.scss']
})
export class StaticMeshDetailComponent implements OnInit {

  constructor(public apiSrv: StaticmeshService) { }

  ngOnInit() {
  }

}
