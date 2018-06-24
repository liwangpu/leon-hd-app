import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input } from '@angular/core';
import { CommomCardItemDirective } from './commom-card-item.directive';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';

@Component({
  selector: 'app-common-card-panel',
  templateUrl: './common-card-panel.component.html',
  styleUrls: ['./common-card-panel.component.scss']
})
export class CommonCardPanelComponent implements OnInit, AfterViewInit {

  seletedItemId = '';
  @Input() launch: CommonCardPanelBase;
  @ViewChildren(CommomCardItemDirective) items: QueryList<CommomCardItemDirective>;
  constructor() { }

  ngOnInit() {

  }//ngOnInit

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

  onItemChange(id: string) {

  }//onItemChange
}


export interface CommonCardPanelBase {
 apiSrv:IListableService<Ilistable>;
}
