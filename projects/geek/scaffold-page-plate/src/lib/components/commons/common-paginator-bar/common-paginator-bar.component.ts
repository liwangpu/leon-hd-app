import { Component, OnInit, OnDestroy, OnChanges, AfterContentInit, Input, EventEmitter, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent, MatCheckbox } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'page-plate-common-paginator-bar',
  templateUrl: './common-paginator-bar.component.html',
  styleUrls: ['./common-paginator-bar.component.scss']
})
export class CommonPaginatorBarComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {

  protected _currentPageSize = 0;
  get selectCountParam(): { value: number } {
    let len = this.selectedItems && this.selectedItems.length > 0 ? this.selectedItems.length : 0;
    return { value: len };
  }
  @Input() select = false;
  @Input() pageTotal: number;
  @Input() pageIndex: number;
  @Input() pageSizeOptions: Array<number> = [15];
  @Input() selectedItems: Array<string>;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageOptionChange = new EventEmitter<number>();
  @Output() allSelectChange = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) paginatorCt: MatPaginator;
  @ViewChild('allCheckCt') allCheckCt: MatCheckbox;
  destroy$ = new Subject<boolean>();
  constructor() {

  }//constructor

  ngOnChanges(change: SimpleChanges) {

    //响应分页参数变化
    let pageSizeOptionsChange = change['pageSizeOptions'];
    if (pageSizeOptionsChange && pageSizeOptionsChange.currentValue && pageSizeOptionsChange.firstChange) {
      let opts: Array<number> = pageSizeOptionsChange.currentValue;
      if (opts && opts.length > 0)
        this._currentPageSize = opts[0];
    }//if 

    //响应有时候需要手动跳转页面到第一页
    let pageIndexChange = change['pageIndex'];
    if (pageIndexChange && pageIndexChange.currentValue) {
      this.paginatorCt.pageIndex = pageIndexChange.currentValue - 1;
    }
  }//ngOnChanges

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  ngAfterContentInit(): void {
    this.paginatorCt.pageIndex = 0;
  }//ngAfterContentInit

  onPageChange(evt: PageEvent) {
    if (this._currentPageSize !== evt.pageSize) {
      this._currentPageSize = evt.pageSize;
      this.pageOptionChange.next(evt.pageSize);
      this.paginatorCt.pageIndex = 0;
    }
    else {
      let idx = evt.pageIndex + 1;
      this.pageChange.next(idx);
    }
  }//pageChange

  clearSelectAll() {
    if (this.allCheckCt)
      this.allCheckCt.checked = false;
  }

  protected onAllSelect(select: boolean) {
    this.allSelectChange.next(select);
  }//onAllSelect

}
