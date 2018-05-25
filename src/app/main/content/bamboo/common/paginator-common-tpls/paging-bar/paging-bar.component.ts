import { Component, OnInit } from '@angular/core';
import { PaginatorCommonMdService } from '../paginator-common-md.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paginator-paging-bar',
  templateUrl: './paging-bar.component.html',
  styleUrls: ['./paging-bar.component.scss']
})
export class PagingBarComponent implements OnInit {

  viewMode = true;
  destroy$: Subject<boolean> = new Subject();
  constructor(private mdSrv: PaginatorCommonMdService) {
    //订阅查看|选择模式
    this.mdSrv.selectMode$.takeUntil(this.destroy$).subscribe(selectMode => {
      this.onSelectModelChange(selectMode);
    });//
  }

  ngOnInit() {
  }//ngOnInit

  pageChange(evt: IPageChangeParam) {
    evt.pageIndex++;//我们系统分页从1开始
    this.mdSrv.pageChange$.next(evt);
  }//pageChange

  allSelect(checked: boolean) {
    this.mdSrv.allSelect$.next(checked);
  }//allSelect

  onSelectModelChange(selectMode: boolean) {
    this.viewMode = !selectMode;
  }//onSelectModelChange

}

export interface IPageChangeParam {
  length: number;
  pageIndex: number;
  pageSize: number;
}