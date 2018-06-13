import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { IEntitybase } from '../../../../toolkit/models/ientitybase';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { tap, debounceTime, filter } from 'rxjs/operators';
import { map } from 'rxjs/operator/map';
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
  filterOptions: Observable<any[]>;
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
    this.searchCt.valueChanges.pipe(debounceTime(300), filter(x => typeof x === 'string')).subscribe(x => {
      let keywordQ = this.launch.keywordQeury(x);
      let advanceQ = this.launch.advanceQuery(x);
      this.filterOptions = this.launch.apiSrv.query(keywordQ, advanceQ).map(res => {
        if (res.data && res.data.length > 0)
          return res.data;
        return [];
      });
    });
  }//ngAfterViewInit

  onSelected(val: MatAutocompleteSelectedEvent) {
    this.optionSelected.next(val.option.value);
  }//onSelected

}



export abstract class CommonAutocompleteSearchBase {
  valueField = 'id';
  displayField = 'name';
  abstract apiSrv: IListableService<IEntitybase>;
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
}
