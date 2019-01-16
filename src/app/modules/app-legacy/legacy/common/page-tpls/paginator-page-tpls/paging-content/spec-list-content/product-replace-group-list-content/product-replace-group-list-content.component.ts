import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginatorCommonMdService } from '../../../paginator-common-md.service';
import { ListDisplayModeEnum } from '../../../paginator-refers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-commom-paging-product-replace-group-list-content',
  templateUrl: './product-replace-group-list-content.component.html',
  styleUrls: ['./product-replace-group-list-content.component.scss']
})
export class ProductReplaceGroupListContentComponent implements OnInit, OnDestroy {

  selectedItem: Array<string> = [];
  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PaginatorCommonMdService) { }

  ngOnInit() {
    // this.mdSrv.displayMode = ListDisplayModeEnum.ProductReplaceGroup;
    //订阅选中项事件,因为有可能列表界面会删除选中项,删除后content如果不订阅,就会出现之前删除的项id又被拼接上来
    this.mdSrv.itemSelected$.pipe(takeUntil(this.destroy$)).subscribe(arr => {
      this.selectedItem = arr;
    });//
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  trackData(data: { id: string }): string {
    return data && data.id ? data.id : '';
  }//trackData

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

  onItemDelete(id: string) {
    this.mdSrv.cacheData = this.mdSrv.cacheData.filter(x => x.id != id);
  }

}
