import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { SimpleIconListItemComponent } from './simple-icon-list-item/simple-icon-list-item.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { Ilistable } from '../../../models/ilistable';
import { IQueryFilter } from '../../interfaces/iqueryFilter';
import { IListableService } from '../../../services/webapis/ilistableService';
import { IQuery } from '../../../services/webapis/api.service';
import { takeUntil, map, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-simple-icon-list-page',
  templateUrl: './simple-icon-list-page.component.html',
  styleUrls: ['./simple-icon-list-page.component.scss']
})
export class SimpleIconListPageComponent implements OnInit, OnDestroy {

  @Input() itemWidth = 200;
  @Input() itemHeight = 150;
  @Input() launch: SimplePaginatorListBase;
  @Output() onItemSelect = new EventEmitter<Array<string>>();
  @ViewChildren(SimpleIconListItemComponent) iconItems: QueryList<SimpleIconListItemComponent>;
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
    this.launch.query$.pipe(takeUntil(this.destroy$)).pipe(concatMap(qParam => {
      return this.launch.apiSrv.query(qParam.basic, qParam.advanceQueryFilters);
    })).pipe(map(res => {
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
    if (!this.launch.multipleSelect) {
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
    if (!bExist && data.seleted)
      this.selectedIds.push(data.id);

    this.onItemSelect.next(this.getSelected());
  }//selectedChange

  getSelected(): Array<string> {
    return this.selectedIds.filter(x => x);
  }//getSelected

}

export abstract class SimplePaginatorListBase {
  multipleSelect = false;
  query$ = new BehaviorSubject<{ basic: IQuery, advanceQueryFilters?: Array<IQueryFilter> }>({ basic: {} });
  abstract apiSrv: IListableService<Ilistable>;
  query(queryParam: IQuery, advanceQueryFiltersParam?: Array<IQueryFilter>) {
    this.query$.next({ basic: queryParam, advanceQueryFilters: advanceQueryFiltersParam });
  }//query
}