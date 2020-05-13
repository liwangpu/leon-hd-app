import { Component, OnInit } from '@angular/core';
import { V1ListViewPageBase } from 'apps-base';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ProductReplaceGroupService, ProductReplaceGroup } from 'micro-dmz-hd';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { AsyncHandleService, DialogFactoryService, SnackbarService } from 'scaffold-app-minor';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-replace-group',
  templateUrl: './product-replace-group.component.html',
  styleUrls: ['./product-replace-group.component.scss']
})
export class ProductReplaceGroupComponent implements OnInit {

  selected = false;
  groups: Array<ProductReplaceGroup> = [];
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: ProductReplaceGroupService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe, protected dialogSrv: DialogFactoryService, protected httpClient: HttpClient, protected snackbarSrv: SnackbarService) {

  }//constructor

  ngOnInit() {
    this.apiSrv.query({ page: 1, pageSize: 999 }).pipe(tap(res => { console.log(res.data) })).subscribe(res => this.groups = res.data ? res.data : []);
  }

  onCategoryNodeSelected(id: string) {
    console.log(1, id);
  }

}
