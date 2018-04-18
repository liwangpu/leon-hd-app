import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Organization } from "../../../toolkit/models/organization";
import { OrganService } from "../../../toolkit/server/webapi/organ.service";
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  animations: fuseAnimations
})
export class OrganComponent implements OnInit {
  dataSource: PaginatorStore<Organization> | null;
  displayedColumns = ['name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  private dataStore: PaginatorStore<Organization>;
  constructor(private organSrv: OrganService) {
  }

  ngOnInit() {
    this.dataStore = new PaginatorStore<Organization>({ service: this.organSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort })
    //   this.dataSource = new FilesDataSource(this.productsService, this.paginator, this.sort);
    //   Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       if (!this.dataSource) {
    //         return;
    //       }
    //       this.dataSource.filter = this.filter.nativeElement.value;
    //     });
    // }
  }
}
