import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorCommonMdService } from '../../paginator-common-md.service';
import { Router } from '@angular/router';
import { ListDisplayModeEnum } from '../../paginator-refers';
import { takeUntil } from 'rxjs/operators';
import { Ilistable } from '../../../../../models/ilistable';

@Component({
  selector: 'app-commom-paging-litimg-list-content',
  templateUrl: './litimg-list-content.component.html',
  styleUrls: ['./litimg-list-content.component.scss']
})
export class LitimgListContentComponent implements OnInit, OnDestroy {

  selectedItem: Array<string> = [];
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PaginatorCommonMdService, public router: Router) { }

  ngOnInit() {
    // this.mdSrv.displayMode = ListDisplayModeEnum.Litimg;
    //订阅选中项事件,因为有可能列表界面会删除选中项,删除后content如果不订阅,就会出现之前删除的项id又被拼接上来
    this.mdSrv.itemSelected$.pipe(takeUntil(this.destroy$)).subscribe(arr => {
      this.selectedItem = arr;
    });//
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onItemCheckchange(checked: boolean, id: string) {
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
  }//onItemCheckchange

  trackData(data?: Ilistable): string | undefined {
    return data ? data.id : '';
  }//trackData

}