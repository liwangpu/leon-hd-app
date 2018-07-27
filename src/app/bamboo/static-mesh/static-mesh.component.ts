import { Component, OnInit } from '@angular/core';
import { StaticMeshPaginatorLaunchService } from './static-mesh-paginator-launch.service';

@Component({
  selector: 'app-static-mesh',
  templateUrl: './static-mesh.component.html',
  styleUrls: ['./static-mesh.component.scss'],
  providers: [StaticMeshPaginatorLaunchService]
})
export class StaticMeshComponent implements OnInit {

  constructor(public launch: StaticMeshPaginatorLaunchService) { }

  ngOnInit() {
  }

}
