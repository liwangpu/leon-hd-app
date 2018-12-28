import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMatAutoSelectApiService } from '../../../interfaces/i-mat-auto-select-api-service';
import { IQueryFilter } from '@geek/micro-base';

@Component({
  selector: 'app-mat-api-auto-select',
  template: `<app-mat-auto-select [defaultValue]='defaultValue' [fieldTitle]='fieldTitle' [required]='required' [usableSelectItems]='_datas' (inputChange)='onInputNameChange($event)' (selectChange)='onSelectChange($event)'  (inputClick)='onInputClick()'></app-mat-auto-select>`
})
export class MatApiAutoSelectComponent implements OnInit {

  private _doInitQuery = false;
  // private _apiService: IMatAutoSelectApiService;
  private _indentify: string;
  _datas: Array<any> = [];
  @Output() afterSelect = new EventEmitter<any>();
  @Output() afterClear = new EventEmitter();
  @Input() defaultValue: string;
  @Input() apiService: IMatAutoSelectApiService;
  // @Input() set apiService(val: IMatAutoSelectApiService) {
  //   this._apiService = val;
  //   if (val)
  //     this.query();
  // }
  // get apiService() {
  //   return this._apiService;
  // }
  @Input() set indentify(val: string) {
    this._indentify = val;
    if (val && this.apiService) {
      this.apiService.getById(val).subscribe(data => {
        this.defaultValue = data['name'];
        this.afterSelect.next(data);
      });
    }//if
  }
  get indentify() {
    return this._indentify;
  }
  @Input() advanceFilters: Array<IQueryFilter>;
  @Input() fieldTitle = 'glossary.UserRole';
  @Input() required: boolean;
  constructor() {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  onInputNameChange(search: string) {
    this.query(search);
    this.afterClear.next();
  }//onInputNameChange

  onSelectChange(item: any) {
    this.afterSelect.next(item);
  }//onSelectChange

  query(search?: string) {
    this.apiService.query({
      page: 1,
      pageSize: 15,
      search: search ? search : ''
    }, this.advanceFilters).subscribe(res => {
      this._datas = res.data ? res.data : [];
    });
  }//searchSubWorkFlow

  onInputClick() {
    if (this._doInitQuery) return;
    this.query();
    this._doInitQuery = true;
  }//onInputClick

}
