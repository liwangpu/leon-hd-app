import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'page-plate-common-litimg-list',
  templateUrl: './common-litimg-list.component.html',
  styleUrls: ['./common-litimg-list.component.scss']
})
export class CommonLitimgListComponent implements OnInit, OnDestroy {

  @Input() select: boolean;
  @Input() datas: Array<any> = [];
  @Output() selectItemChange = new EventEmitter<{ id: string, checked: boolean }>();
  @Output() rowClick = new EventEmitter<{ data: any, id: string }>();
  destroy$ = new Subject<boolean>();
  constructor() {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onClick(data: any) {
    //选择模式
    if (this.select) {
      // data.select = !data.select;
      let selectVal = data.select ? true : false;
      this.selectItemChange.next({ id: data.id, checked: !selectVal });
      // this.selectedIds = this.datas.filter(x => x.select).map(x => x.id);
    }
    else {
      //非选择模式
      this.rowClick.next({ data: data, id: data.id });
    }
  }//onClick

}
