import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChildren, QueryList } from '@angular/core';
import { EntityBase } from '../../../models/entitybase';
import { ICommonCardPreItem, ICommonCardManageButton, CommonCardPanelBase } from './card-list-panel-refers';
import { Subject } from 'rxjs';
import { CardListPanelTplsDirective } from './card-list-panel-tpls.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-card-list-panel-tpls',
  templateUrl: './card-list-panel-tpls.component.html',
  styleUrls: ['./card-list-panel-tpls.component.scss']
})
export class CardListPanelTplsComponent implements OnInit, OnDestroy, AfterViewInit {

  seletedItemId = '';
  datas: Array<EntityBase>;
  preItems: Array<ICommonCardPreItem> = [];
  buttons: Array<ICommonCardManageButton>;
  selectChange$ = new Subject<string>();
  destroy$ = new Subject<boolean>();
  @Input() launch: CommonCardPanelBase;
  @ViewChildren(CardListPanelTplsDirective) items: QueryList<CardListPanelTplsDirective>;
  constructor() { }

  ngOnInit() {
    if (!this.launch)
      return;
    this.launch.apiSrv.queryData$.pipe(takeUntil(this.destroy$)).subscribe(datas => {
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
