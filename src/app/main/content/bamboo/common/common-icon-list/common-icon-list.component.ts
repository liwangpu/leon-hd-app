import { Component, OnInit, Input, ViewChildren, QueryList, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { CommonIconItemComponent } from './common-icon-item/common-icon-item.component';
import { IQuery } from '../../../../toolkit/server/webapi/api.service';
import { IQueryFilter } from '../../../../toolkit/common/interfaces/iqueryFilter';
import { of } from 'rxjs/observable/of';



@Component({
  selector: 'app-common-icon-list',
  templateUrl: './common-icon-list.component.html',
  styleUrls: ['./common-icon-list.component.scss']
})
export class CommonIconListComponent implements OnInit, OnDestroy {

  @Input() itemWidth = 200;
  @Input() itemHeight = 150;
  @Input() launch: CommonIconListComponentBase;
  @Output() onItemSelect = new EventEmitter<Array<string>>();
  @ViewChildren(CommonIconItemComponent) iconItems: QueryList<CommonIconItemComponent>;
  datas = new Subject<Array<Ilistable>>();
  _datas = [];
  destroy$ = new Subject<boolean>();
  constructor() {

  }//constructor

  get itemStyle() {
    return {
      width: this.itemWidth + 'px',
      height: this.itemHeight + 'px'
    };
  }

  private selectedIds = [];

  ngOnInit() {
    if (!this.launch.apiSrv)
      return;
    this.launch.query$.takeUntil(this.destroy$).concatMap(qParam => {
      return this.launch.apiSrv.query(qParam.basic, qParam.advanceQueryFilters);
    }).pipe(map(res => {
      return res && res.data && res.data.length > 0 ? res.data : [];
    })).subscribe(datas => {
      this.datas.next(datas);
    });

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  selectedChange(data: { id: string, seleted: boolean }) {
    if (this.launch && !this.launch.multipleSelect) {
      //单选状态
      this.selectedIds = [];
      this.iconItems.forEach(item => {
        if (item.fid != data.id)
          item.clearSelect();
      });
    }
    //
    let bExist = false;
    for (let idx = this.selectedIds.length - 1; idx >= 0; idx--) {
      if (this.selectedIds[idx] == data.id) {
        bExist = true;
        if (!data.seleted)
          this.selectedIds[idx] = undefined;
        break;
      }
    }
    if (!bExist)
      this.selectedIds.push(data.id);



    this.onItemSelect.next(this.getSelected());
  }//selectedChange

  getSelected(): Array<string> {
    return this.selectedIds.filter(x => x);
  }//getSelected

}

export abstract class CommonIconListComponentBase {
  multipleSelect = false;
  query$ = new BehaviorSubject<{ basic: IQuery, advanceQueryFilters?: Array<IQueryFilter> }>({ basic: {} });
  abstract apiSrv: IListableService<Ilistable>;
  query(queryParam: IQuery, advanceQueryFiltersParam?: Array<IQueryFilter>) {
    this.query$.next({ basic: queryParam, advanceQueryFilters: advanceQueryFiltersParam });
  }//query
}