import { Component, OnInit } from '@angular/core';
import { PaginatorCommonMdService } from '../paginator-common-md.service';

@Component({
  selector: 'app-paginator-paging-content',
  templateUrl: './paging-content.component.html',
  styleUrls: ['./paging-content.component.scss']
})
export class PagingContentComponent implements OnInit {

  constructor(public mdSrv: PaginatorCommonMdService) {

    // this.mdSrv.page
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

}
