import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Material } from '../../../toolkit/models/material';
import { MaterialService } from '../../../toolkit/server/webapi/material.service';
import { PaginatorStore } from '../../../toolkit/common/classes/paginator-store';
import { MatSort, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';
import { fuseAnimations } from '../../../../core/animations';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  animations: fuseAnimations
})
export class MaterialComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  displayedColumns = ['icon', 'name', 'description', 'createdTime'];
  dataSource: PaginatorStore<Material>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(private materialSrv: MaterialService, public pathSrv: PathService) {
    
   }

  ngOnInit() {
    this.dataSource = new PaginatorStore<Material>({ service: this.materialSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort })
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
