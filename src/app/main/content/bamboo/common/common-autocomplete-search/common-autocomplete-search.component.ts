import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { IEntitybase } from '../../../../toolkit/models/ientitybase';
import { FormControl } from '@angular/forms';
import {  BehaviorSubject } from 'rxjs';
import { tap, debounceTime, filter } from 'rxjs/operators';
import { IQuery } from '../../../../toolkit/server/webapi/api.service';
import { IQueryFilter } from '../../../../toolkit/common/interfaces/iqueryFilter';
import { MatAutocompleteSelectedEvent } from '@angular/material';



@Component({
  selector: 'app-common-autocomplete-search',
  templateUrl: './common-autocomplete-search.component.html',
  styleUrls: ['./common-autocomplete-search.component.scss']
})
export class CommonAutocompleteSearchComponent implements OnInit, AfterViewInit {
  searchCt = new FormControl();
  valueField = 'id';
  displayField = 'name';
  filterOptions = new BehaviorSubject<any[]>([]);
  @Input() launch: CommonAutocompleteSearchBase;
  @Output() optionSelected = new EventEmitter<any>();
  constructor() {

  }

  ngOnInit() {

  }//ngOnInit

  ngAfterViewInit(): void {
    if (!this.launch) return;
    this.valueField = this.launch.valueField;
    this.displayField = this.launch.displayField;
    this.searchCt.valueChanges.pipe(debounceTime(300), filter(x => typeof x === 'string'), tap(x => this.optionSelected.next({}))).subscribe(x => {
      let keywordQ = this.launch.keywordQeury(x);
      let advanceQ = this.launch.advanceQuery(x);
      //关键字和高级搜索"与"查询
      if (!this.launch.keywordAndAdvanceSingleSearch) {
        this.filterOptions = this.launch.apiSrv.query(keywordQ, advanceQ).map(res => {
          if (res.data && res.data.length > 0)
            return res.data;
          return [];
        });
      }
      else {
        //关键字和高级搜索"或"查询
        let keywordSource$ = this.launch.apiSrv.query(keywordQ).map(res => {
          if (res.data && res.data.length > 0)
            return res.data;
          return [];
        });
        let advanceSource$ = this.launch.apiSrv.query({}, advanceQ).map(res => {
          if (res.data && res.data.length > 0)
            return res.data;
          return [];
        });

        keywordSource$.subscribe(kwData => {
          if (!x) {
            this.filterOptions.next(kwData);
            return;
          }
          //有关键字才进行高级搜索
          advanceSource$.subscribe(avData => {
            if (avData.length > 0) {
              for (let item of avData) {
                let bExist = (kwData as Array<IEntitybase>).some(x => x.id === item.id);
                if (!bExist)
                  (kwData as Array<IEntitybase>).push(item);
              }//for
            }
            this.filterOptions.next(kwData);
          });//subscribe
        });//subscribe
      }
    });
  }//ngAfterViewInit

  onSelected(val: MatAutocompleteSelectedEvent) {
    this.optionSelected.next(val.option.value);
  }//onSelected

}



export abstract class CommonAutocompleteSearchBase {
  valueField = 'id';
  displayField = 'name';
  keywordAndAdvanceSingleSearch = false;//关键字和高级搜索单独查询
  abstract apiSrv: IListableService<any>;
  keywordQeury(keyword: string): IQuery {
    return { search: keyword };
  }//keywordQeury
  advanceQuery(keyword: string): Array<IQueryFilter> {
    return [];
  }//advanceQuery
  /**
   * displayFn必须定义在这里,因为displayField无法使用在displayFn函数里面
   * @param item 
   */
  displayFn(item?: IEntitybase): string | undefined {
    return item ? item.name : '';
  }//displayFn

  optionDisplayFn(item?: IEntitybase): string {
    return item ? item.name : '';
  }//
}
