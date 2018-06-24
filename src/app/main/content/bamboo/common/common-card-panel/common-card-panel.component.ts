import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { CommomCardItemDirective } from './commom-card-item.directive';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../../../../toolkit/server/webapi/api.service';
import { EntityBase } from '../../../../toolkit/models/entitybase';

@Component({
  selector: 'app-common-card-panel',
  templateUrl: './common-card-panel.component.html',
  styleUrls: ['./common-card-panel.component.scss']
})
export class CommonCardPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  seletedItemId = '';
  datas: Array<EntityBase>;
  buttons: Array<ICommonCardManageButton>;
  destroy$ = new Subject<boolean>();
  @Input() launch: CommonCardPanelBase;
  @ViewChildren(CommomCardItemDirective) items: QueryList<CommomCardItemDirective>;
  constructor() { }

  ngOnInit() {
    if (!this.launch)
      return;
    this.launch.apiSrv.queryData$.takeUntil(this.destroy$).subscribe(datas => {
      this.datas = datas as Array<EntityBase>;
      // console.log('depar', datas);
    });
    this.buttons = this.launch.buttons;
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


  ngAfterViewInit(): void {

  }//ngAfterViewInit

  onItemSelect(id: string) {
    this.seletedItemId = id;
    this.items.forEach(x => {
      if (x.fid !== id)
        x.clearSelected();
      else
        x.seleteMe();
    });
  }//onItemSelect

  trackFn(item?: EntityBase): string {
    return item ? item.id : '';
  }//trackFn

  onItemChange(id: string) {

  }//onItemChange
}


export abstract class CommonCardPanelBase {
  title: string;
  apiSrv: IListableService<EntityBase>;
  buttons: Array<ICommonCardManageButton> = [];
  abstract editData(data?: EntityBase): void;
  abstract deleteData(data: EntityBase): void;
}

export interface ICommonCardManageButton {
  icon: string;
  name: string;
  onClick: Function;
}