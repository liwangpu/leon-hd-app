import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material';
import { PaginatorCommonMdService } from '../paginator-common-md.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPageChangeParam } from '../paginator-refers';

@Component({
  selector: 'app-paginator-paging-bar',
  templateUrl: './paging-bar.component.html',
  styleUrls: ['./paging-bar.component.scss']
})
export class PagingBarComponent implements OnInit {

  selected = false;
  viewMode = true;
  @ViewChild(MatCheckbox) allCheckCt: MatCheckbox;
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PaginatorCommonMdService) {
    //订阅查看|选择模式
    this.mdSrv.selectMode$.pipe(takeUntil(this.destroy$)).subscribe(selectMode => {
      this.onSelectModelChange(selectMode);
    });//
  }//constructor

  ngOnInit() {

  }//ngOnInit

  pageChange(evt: IPageChangeParam) {
    evt.pageIndex++;//我们系统分页从1开始
    this.mdSrv.pageParam = evt;
  }//pageChange

  allSelect(checked: boolean) {
    this.mdSrv.allSelect = checked;
    if (checked)
      this.mdSrv.selectedItems = this.mdSrv.cacheData.map(x => x.id);
    else
      this.mdSrv.selectedItems = [];
  }//allSelect

  onSelectModelChange(selectMode: boolean) {
    this.viewMode = !selectMode;
    if (this.viewMode)
      this.allCheckCt.checked = false;
  }//onSelectModelChange


}
