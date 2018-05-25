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

  @Input() dataDisplayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;//列表数据显示模式 列表或卡片等等
  destroy$: Subject<boolean> = new Subject();
  constructor(protected mdSrv: PaginatorCommonMdService) {

    //订阅分页事件
    this.mdSrv.pageChange$.takeUntil(this.destroy$).subscribe(param => {
      this.onPageChange(param);
    });//
    //订阅全选|反选事件
    this.mdSrv.allSelect$.takeUntil(this.destroy$).subscribe(select => {
      this.onAllSelectChange(select);
    });//
    //订阅查看|选择模式
    this.mdSrv.selectMode$.takeUntil(this.destroy$).subscribe(selectMode => {
      this.onSelectModelChange(selectMode);
    });//
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onPageChange(param: IPageChangeParam) {
    console.log('page-change', param);
  }//onPageChange

  onAllSelectChange(select: boolean) {
    console.log('page-select', select);
  }//onAllSelectChange

  onSelectModelChange(selectMode: boolean) {
    console.log('page-mode', selectMode);
  }//

}
