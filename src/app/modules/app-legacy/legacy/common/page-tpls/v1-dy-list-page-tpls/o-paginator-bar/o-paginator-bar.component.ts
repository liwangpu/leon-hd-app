import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1ListPageScheduleService } from '../v1-list-page-schedule.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-v1-dy-list-page-tpls-o-paginator-bar',
  templateUrl: './o-paginator-bar.component.html',
  styleUrls: ['./o-paginator-bar.component.scss']
})
export class OPaginatorBarComponent implements OnInit, OnDestroy {

  showAllCheck = false;
  allCheck = false;
  datasTotal = 0;
  pageSize = 0;
  pageSizeOptions: Array<number>;
  destroy$ = new Subject<boolean>();
  constructor(public scheduleSrv: V1ListPageScheduleService) { }

  ngOnInit() {
    //订阅分页选项改变事件
    this.scheduleSrv.pageSizeOptions$.pipe(takeUntil(this.destroy$)).subscribe(opt => {
      this.pageSizeOptions = opt;
      if (opt.length > 0)
        this.pageSize = opt[0];
    });
    //订阅分页数据改变事件
    this.scheduleSrv.datas$.pipe(takeUntil(this.destroy$)).subscribe(datas => {
      this.datasTotal = datas.total;
    });
    //订阅选择模式事件
    this.scheduleSrv.selectMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      this.showAllCheck = mode;
      if (!mode)
        this.allCheck = false;
    });
    //订阅分页改变事件
    this.scheduleSrv.pageChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.allCheck = false;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  pageChange(param: PageEvent) {
    this.scheduleSrv.pageParam = param;
  }//pageChange

  onAllSelect() {
    this.allCheck = !this.allCheck;
    if (this.allCheck)
      this.scheduleSrv.allSelect();
    else
      this.scheduleSrv.cancelAllSelect();
  }//onAllSelect

}
