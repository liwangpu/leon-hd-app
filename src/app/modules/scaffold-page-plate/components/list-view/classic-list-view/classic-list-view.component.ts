import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { IPageData } from '../../../interfaces/i-page-data';
import { IListViewAdvanceMenu } from '../../../interfaces/i-list-view-advance-menu';
import { ITableListRowMenu } from '../../../interfaces/i-table-list-row-menu';
import { ICommonTableColumndef } from '../../../interfaces/i-common-table-columndef';
import { CommonListViewerComponent } from '../../commons/common-list-viewer/common-list-viewer.component';
import { Subject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'page-plate-classic-list-view',
  templateUrl: './classic-list-view.component.html',
  styleUrls: ['./classic-list-view.component.scss']
})
export class ClassicListViewComponent implements OnInit, OnDestroy {

  _enableResetColumnDisplayPanel = false;
  _showColumnDisplayPanel = false;
  _initDisplayColumns: Array<string> = [];
  _currentPageModel: string;
  _select = false;
  _enableCreate = false;
  _selectedItems = [];
  _permissionPoints = [];
  _pageData: IPageData = null;
  @Input() icon = 'shopping_basket';
  @Input() title = 'list';
  @Input() readOnly = true;
  @Input() pageModels: Array<string> = [];
  @Input() set pageData(val: IPageData) {
    this._pageData = val;
  }
  get pageData() {
    return this._pageData;
  }
  @Input() set permissionPoints(value: Array<string>) {
    this._permissionPoints = value ? value : []
      ;
    this._enableCreate = this._permissionPoints.some(x => x.toLocaleLowerCase() == 'create');
  }
  get permissionPoints(): Array<string> {
    return this._permissionPoints;
  }
  @Input() pageSizeOptions: Array<number> = [25];
  @Input() advanceMenus: Array<IListViewAdvanceMenu> = [];
  @Input() rowMenus: Array<ITableListRowMenu> = [];
  @Input() displayedColumns: Array<string> = [];
  @Input() columnDefs: Array<ICommonTableColumndef> = [];
  @Output() sortData = new EventEmitter<{ field: string, direction: string }>();
  @Output() createData = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageRefresh = new EventEmitter<void>();
  @Output() rowClick = new EventEmitter<{ data: any, id: string }>();
  @Output() pageOptionChange = new EventEmitter<number>();
  @Output() pageModelChange = new EventEmitter<string>();
  @ViewChild('listViewerCt') listViewerCt: CommonListViewerComponent;
  destroy$ = new Subject<boolean>();
  constructor() { }

  ngOnInit() {
    if (this.pageModels && this.pageModels.length > 0)
      this._currentPageModel = this.pageModels[0];
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onRefresh() {
    this.pageRefresh.next();
  }//onRefresh

  onSelect(selected: boolean) {
    this._select = selected;
    if (!selected)
      this.clearSelected();
  }//onSelect

  onPageModelChange(mod: string) {
    this._currentPageModel = mod.toLocaleLowerCase();
    this.pageModelChange.next(mod);
  }//onPageModelChange

  onPageChange(pageIndex: number) {
    this.pageChange.next(pageIndex);
  }//onPageChange

  onPageOptionChange(size: number) {
    this.pageOptionChange.next(size);
  }//onPageOptionChange

  onSelectItemChange(it: { id: string, checked: boolean }) {
    //修改原始数据
    if (this._pageData && this._pageData.data && this._pageData.data.length > 0) {
      for (let idx = this._pageData.data.length - 1; idx >= 0; idx--) {
        let item = this._pageData.data[idx];
        if (item['id'] == it.id) {
          item['select'] = it.checked;
          break;
        }
      }//for
    }//if
    //修改选中项
    let exist = this._selectedItems.some(x => x == it.id);
    if (it.checked) {
      if (!exist)
        this._selectedItems.push(it.id);
    }
    else {
      if (exist)
        this._selectedItems = this._selectedItems.filter(x => x != it.id);
    }
  }//onSelectItemChange

  /**
   * 该方法很重要,高级按钮一般完成后会调用,清理掉已经选中记录
   */
  clearSelected() {
    this._selectedItems = [];
    if (this._pageData && this._pageData.data && this._pageData.data.length > 0) {
      for (let idx = this._pageData.data.length - 1; idx >= 0; idx--) {
        let item = this._pageData.data[idx];
        item['select'] = false;
      }
    }//if
    if (this.listViewerCt)
      this.listViewerCt.clearSelectAllBar();
  }//clearSelected

  onRowClick(ms: { data: any, id: string }) {
    this.rowClick.next(ms);
  }//onRowClick

  onSortData(sort: { field: string, direction: string }) {
    this.sortData.next(sort);
  }//sortData

  onCreateData() {
    this.createData.next();
  }//onCreateData

  onAllSelectChange(select: boolean) {
    if (select) {
      if (this._pageData && this._pageData.data && this._pageData.data.length > 0) {
        for (let idx = this._pageData.data.length - 1; idx >= 0; idx--) {
          let item = this._pageData.data[idx];
          item['select'] = true;
        }
        this._selectedItems = this._pageData.data.map(x => x.id);
      }//if
    }
    else {
      this.clearSelected();
    }
  }//onAllSelectChange

  onToggleColumnPanel() {
    this._showColumnDisplayPanel = !this._showColumnDisplayPanel;
  }//onToggleColumnPanel

  onDisplayColumnChange(evt: MatCheckboxChange, columnId: string) {
    //第一次记录下原始的列信息
    if (this._initDisplayColumns.length <= 0) {
      for (let item of this.displayedColumns) {
        if (item != 'select')
          this._initDisplayColumns.push(item);
      }
    }
    this._enableResetColumnDisplayPanel = true;
    let existColumn = this.displayedColumns.some(x => x == columnId);
    //需要显示该列
    if (evt.checked) {
      //该列不存在
      if (!existColumn) {
        let disArr = [];
        for (let item of this.displayedColumns) {
          disArr.push(item);
        }
        disArr.push(columnId);
        this.displayedColumns = disArr;
      }
    }
    else {
      //需要隐藏该列
      //该列存在
      if (existColumn) {
        this.displayedColumns = this.displayedColumns.filter(x => x !== columnId);
      }
    }
  } //onDisplayColumnChange 

  resetDisplayColumn() {
    //为了保证_initDisplayColumns不被破坏,用循环拷贝
    let tmpArr = [];
    for (let item of this._initDisplayColumns) {
      tmpArr.push(item);
    }

    if (this._select)
      tmpArr.unshift('select');

    this.displayedColumns = tmpArr;
    this._enableResetColumnDisplayPanel = false;
  }//resetDisplayColumn

  closeColumnDisplayPanel() {
    this._showColumnDisplayPanel = false;
  }//closeColumnDisplayPanel

  checkColumnIsDisplay(column: string) {
    if (!this.displayedColumns || this.displayedColumns.length <= 0) return false;
    return this.displayedColumns.some(x => x == column);
  }//checkColumnIsDisplay

}
