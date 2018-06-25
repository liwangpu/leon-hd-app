import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { CommomCardItemDirective } from './commom-card-item.directive';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Subject } from 'rxjs';
import { EntityBase } from '../../../../toolkit/models/entitybase';

@Component({
  selector: 'app-common-card-panel',
  templateUrl: './common-card-panel.component.html',
  styleUrls: ['./common-card-panel.component.scss']
})
export class CommonCardPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  seletedItemId = '';
  datas: Array<EntityBase>;
  preItems: Array<ICommonCardPreItem> = [];
  buttons: Array<ICommonCardManageButton>;
  selectChange$ = new Subject<string>();
  destroy$ = new Subject<boolean>();
  @Input() launch: CommonCardPanelBase;
  @ViewChildren(CommomCardItemDirective) items: QueryList<CommomCardItemDirective>;
  constructor() { }

  ngOnInit() {
    if (!this.launch)
      return;
    this.launch.apiSrv.queryData$.takeUntil(this.destroy$).subscribe(datas => {
      this.datas = datas as Array<EntityBase>;
    });
    this.buttons = this.launch.buttons;
    this.preItems = this.launch.preItems;
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


  ngAfterViewInit(): void {
    this.items.forEach(x => {
      if (x.defaultItem) {
        x.seleteMe();
        this.launch.selectChange$.next(x.fid);
      }
      else
        x.clearSelected();
    });
  }//ngAfterViewInit

  onItemSelect(id: string) {
    if (this.seletedItemId === id)
      return;
    this.seletedItemId = id;
    this.items.forEach(x => {
      if (x.fid !== id)
        x.clearSelected();
      else
        x.seleteMe();
    });
    this.launch.selectChange$.next(id);
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
  preItems: Array<ICommonCardPreItem> = [];
  buttons: Array<ICommonCardManageButton> = [];
  selectChange$ = new Subject<string>();
  abstract editData(data?: EntityBase): void;
  abstract deleteData(data: EntityBase): void;
}

export interface ICommonCardPreItem {
  id: string;
  icon?: string;
  name: string;
  defaultItem?: boolean;
}

export interface ICommonCardManageButton {
  icon: string;
  name: string;
  onClick: Function;
  needDataFirst?: boolean;
}