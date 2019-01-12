import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { IPageData } from '../../../interfaces/i-page-data';
import { ITableListRowMenu } from '../../../interfaces/i-table-list-row-menu';
import { ICommonTableColumndef } from '../../../interfaces/i-common-table-columndef';
import { CommonTableListComponent } from '../common-table-list/common-table-list.component';
import { CommonPaginatorBarComponent } from '../common-paginator-bar/common-paginator-bar.component';

@Component({
  selector: 'page-plate-common-list-viewer',
  templateUrl: './common-list-viewer.component.html',
  styleUrls: ['./common-list-viewer.component.scss']
})
export class CommonListViewerComponent implements OnInit {

  private _pageData: IPageData;
  _selectAll = false;
  _pageIndex = 0;
  _pageTotal = 0;
  _selectedIds: Array<string> = [];
  @Input() select: boolean;
  @Input() pageModel: string;
  @Input() set pageData(value: IPageData) {
    this._pageData = value;
    if (value && value.data && value.data.length > 0) {
      let datas = value.data;
      for (let idx = 0, len = datas.length; idx < len; idx++) {
        let item = datas[idx];
        item['seqno'] = (value.page - 1) * value.size + idx + 1;
      }
      this._pageData.data = datas;
    }
    else {
      this._pageData.data = [];
    }
    this._pageIndex = this._pageData.page;
    this._pageTotal = value.total;
  }
  get pageData(): IPageData {
    return this._pageData;
  }
  @Input() pageSizeOptions: Array<number> = [15, 50, 100];
  @Input() displayedColumns: Array<string> = [];
  @Input() rowMenus: Array<ITableListRowMenu> = [];
  @Input() columnDefs: Array<ICommonTableColumndef> = [];
  @Input() selectedItems: Array<string>
  @Output() sortData = new EventEmitter<{ field: string, direction: string }>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() rowClick = new EventEmitter<{ data: any, id: string }>();
  @Output() pageOptionChange = new EventEmitter<number>();
  @Output() selectItemChange = new EventEmitter<{ id: string, checked: boolean }>();
  @Output() allSelectChange = new EventEmitter<boolean>();
  @ViewChild('tableListCt') tableListCt: CommonTableListComponent;
  @ViewChild('paginatorBarCt') paginatorBarCt: CommonPaginatorBarComponent;
  constructor() { }

  ngOnInit() {
  }//ngOnInit

  onPageChange(pageIndex: number) {
    this.pageChange.next(pageIndex);
  }//onPageChange

  onPageOptionChange(size: number) {
    this.pageOptionChange.next(size);
  }//onPageOptionChange

  onAllSelectChange(select: boolean) {
    this._selectAll = select;
    this.allSelectChange.next(select);
  }//onAllSelectChange

  onSelectItemChange(it: { id: string, checked: boolean }) {
    this.selectItemChange.next(it);
  }//onSelectItemChange

  clearSelected() {
    this._selectedIds = [];
    if (this.tableListCt)
      this.tableListCt.clearSelected();
  }//clearSelected

  onRowClick(ms: { data: any, id: string }) {
    this.rowClick.next(ms);
  }//onRowClick

  /**
   * 清除全选按钮的选中状态
   */
  clearSelectAllBar() {
    this.paginatorBarCt.clearSelectAll();
  }//clearSelectAllBar

  onSortData(sort: { field: string, direction: string }) {
    this.sortData.next(sort);
  }//sortData

}
