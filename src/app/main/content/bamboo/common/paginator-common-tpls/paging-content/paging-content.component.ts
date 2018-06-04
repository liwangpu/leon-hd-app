import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginatorCommonMdService } from '../paginator-common-md.service';

@Component({
  selector: 'app-paginator-paging-content',
  templateUrl: './paging-content.component.html',
  styleUrls: ['./paging-content.component.scss']
})
export class PagingContentComponent implements OnInit, OnDestroy {

  constructor(public mdSrv: PaginatorCommonMdService) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy


}
