import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaginatorStore } from '../../../toolkit/common/classes/paginator-store';
import { MatPaginator, MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { Map } from "../../../toolkit/models/map";
import { MapService } from '../../../toolkit/server/webapi/map.service';
import { fuseAnimations } from '../../../../core/animations';
import { PathService } from '../../services/path.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: fuseAnimations
})
export class MapComponent implements OnInit {

  displayedColumns = ['icon', 'name', 'description', 'createdTime'];
  dataSource: PaginatorStore<Map>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  destroy$: Subject<boolean> = new Subject();
  constructor(private mapSrv: MapService, public pathSrv: PathService) {
  }

  ngOnInit() {
    this.dataSource = new PaginatorStore<Map>({ service: this.mapSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


}
