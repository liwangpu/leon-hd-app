import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ListDisplayModeEnum } from '../../paginator-common-tpls.component';
import { PaginatorCommonMdService } from '../../paginator-common-md.service';
import { Subject } from 'rxjs';
import { IPageChangeParam } from '../../paging-bar/paging-bar.component';
import { Ilistable } from '../../../../../../toolkit/models/ilistable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commom-paging-table-list-content',
  templateUrl: './table-list-content.component.html',
  styleUrls: ['./table-list-content.component.scss']
})
export class TableListContentComponent implements OnInit {

  selectedItem: Array<string> = [];
  allSelected = false;
  destroy$: Subject<boolean> = new Subject();
  constructor(public mdSrv: PaginatorCommonMdService, public router: Router) {

    //订阅全选|反选事件
    this.mdSrv.allSelect$.takeUntil(this.destroy$).subscribe(select => {
      this.allSelected = select;
      if (select) {
        this.selectedItem = this.mdSrv.cacheData.map(x => x.id);
        this.mdSrv.selectedItems = this.selectedItem;
      }
      else {
        this.selectedItem = [];
        this.mdSrv.selectedItems = [];
      }
    });//
    //订阅查看|选择模式
    this.mdSrv.selectMode$.takeUntil(this.destroy$).subscribe(selectMode => {
      this.allSelected = !selectMode;
    });//
  }//constructor

  ngOnInit() {
    // console.log('table ', this.tableListCt);
    // this.tableListCt.addRowDef()
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  rowSelect(id: any) {
    // console.log('onCheckBoxSelect', row);
    if (this.mdSrv.selectMode)
      return;
    this.router.navigate([this.mdSrv.createdUrl, id]);
  }//rowSelect

  onCheckBoxSelect(checked: boolean, id: string) {
    let exist = this.selectedItem.some(x => x == id);
    if (checked) {
      if (!exist)
        this.selectedItem.push(id);
    }
    else {
      if (exist) {
        for (let idx = this.selectedItem.length - 1; idx >= 0; idx--) {
          if (this.selectedItem[idx] == id) {
            this.selectedItem[idx] = undefined;
          }
        }//for
      }//if
    }
    this.mdSrv.selectedItems = this.selectedItem;
  }//onCheckBoxSelect


}
