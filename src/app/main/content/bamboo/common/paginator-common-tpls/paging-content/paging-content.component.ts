import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PaginatorCommonMdService } from '../paginator-common-md.service';
import { Subject } from 'rxjs';
import { IPageChangeParam } from '../paging-bar/paging-bar.component';
import { ListDisplayModeEnum } from '../paginator-common-tpls.component';

@Component({
  selector: 'app-paginator-paging-content',
  templateUrl: './paging-content.component.html',
  styleUrls: ['./paging-content.component.scss']
})
export class PagingContentComponent implements OnInit, OnDestroy {

  // displayMode: ListDisplayModeEnum;
  constructor(public mdSrv: PaginatorCommonMdService) {


  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy


}
