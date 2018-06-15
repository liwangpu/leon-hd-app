import { Component, OnInit, Input, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { CommonIconItemComponent } from './common-icon-item/common-icon-item.component';
import { IQuery } from '../../../../toolkit/server/webapi/api.service';
import { IQueryFilter } from '../../../../toolkit/common/interfaces/iqueryFilter';
import { concatMap } from 'rxjs/operator/concatMap';

@Component({
  selector: 'app-common-icon-list',
  templateUrl: './common-icon-list.component.html',
  styleUrls: ['./common-icon-list.component.scss']
})
export class CommonIconListComponent implements OnInit, OnDestroy {

  @Input() itemWidth = 200;
  @Input() itemHeight = 150;
  @Input() launch: CommonIconListComponentBase;
  @ViewChildren(CommonIconItemComponent) iconItems: QueryList<CommonIconItemComponent>;
  datas = new Observable<Array<Ilistable>>();
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
    this.datas = this.launch.apiSrv.query({}).map(res => {
      if (res.data && res.data.length > 0)
        return res.data;
      return [];
    }) as Observable<Array<Ilistable>>;
    // this.datas = this.launch.query$.takeUntil(this.destroy$).pipe(concatMap(_ => {
    //   return this.launch.apiSrv.query({}).map(res => {
    //     if (res.data && res.data.length > 0)
    //       return res.data;
    //     return [];
    //   });
    // }));
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  selectedChange(data: { id: string, seleted: boolean }) {
    if (this.launch && !this.launch.multipleSelect) {
      //单选状态
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
  }//selectedChange

  getSelected(): Array<string> {
    return this.selectedIds.filter(x => x);
  }//getSelected

}

export abstract class CommonIconListComponentBase {
  multipleSelect = false;
  query$ = new BehaviorSubject<{ query: IQuery, advanceQueryFilters?: Array<IQueryFilter> }>({ query: {} });
  abstract apiSrv: IListableService<Ilistable>;
  query(queryParam: IQuery, advanceQueryFiltersParam?: Array<IQueryFilter>) {
    this.query$.next({ query: queryParam, advanceQueryFilters: advanceQueryFiltersParam });
  }//query
}