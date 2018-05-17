import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { PaginatorStore } from '../../../toolkit/common/classes/paginator-store';
import { StaticMesh } from '../../../toolkit/models/staticmesh';
import { MatSort, MatPaginator } from '@angular/material';
import { StaticmeshService } from '../../../toolkit/server/webapi/staticmesh.service';
import { fuseAnimations } from '../../../../core/animations';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-staticmesh',
  templateUrl: './staticmesh.component.html',
  styleUrls: ['./staticmesh.component.scss'],
  animations: fuseAnimations
})
export class StaticmeshComponent implements OnInit, OnDestroy {


  displayedColumns = ['icon', 'name', 'description', 'createdTime'];
  dataSource: PaginatorStore<StaticMesh>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(public meshSrv: StaticmeshService, public pathSrv: PathService) { }

  ngOnInit() {
    this.dataSource = new PaginatorStore<StaticMesh>({ service: this.meshSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort })
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

}
