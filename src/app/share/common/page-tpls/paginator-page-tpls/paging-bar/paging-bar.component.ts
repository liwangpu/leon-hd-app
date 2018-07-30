import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatCheckbox, MatPaginator } from '@angular/material';
import { PaginatorCommonMdService } from '../paginator-common-md.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPageChangeParam } from '../paginator-refers';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-paginator-paging-bar',
  templateUrl: './paging-bar.component.html',
  styleUrls: ['./paging-bar.component.scss']
})
export class PagingBarComponent implements OnInit, OnDestroy {


  selected = false;
  viewMode = true;
  @ViewChild(MatCheckbox) allCheckCt: MatCheckbox;
  @ViewChild(MatPaginator) paginatorCt: MatPaginator;
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PaginatorCommonMdService, private tranSrv: TranslateService) {
    //订阅查看|选择模式
    this.mdSrv.selectMode$.pipe(takeUntil(this.destroy$)).subscribe(selectMode => {
      this.onSelectModelChange(selectMode);
    });//
  }//constructor

  ngOnInit() {
    this.tranSrv.get('tips.ItemsPerPageLabel').subscribe(msg => {
      this.paginatorCt._intl.itemsPerPageLabel = msg;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  pageChange(evt: IPageChangeParam) {
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
