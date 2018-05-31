
import { StaticmeshMdService } from './staticmesh-md.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-staticmesh',
  templateUrl: './staticmesh.component.html',
  styleUrls: ['./staticmesh.component.scss'],
  providers: [
    StaticmeshMdService
  ]
})
export class StaticmeshComponent implements OnInit, OnDestroy {

  constructor(public mdSrv: StaticmeshMdService) { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

}
