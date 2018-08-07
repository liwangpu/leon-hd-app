import { Component, OnInit } from '@angular/core';
import { V1ListPageScheduleService } from '../v1-list-page-schedule.service';

@Component({
  selector: 'app-v1-list-page-o-manage-buttons',
  templateUrl: './o-manage-buttons.component.html',
  styleUrls: ['./o-manage-buttons.component.scss']
})
export class OManageButtonsComponent implements OnInit {

  selected = false;
  constructor(public scheduleSrv: V1ListPageScheduleService) {

  }//constructor

  ngOnInit() {
    
  }//ngOnInit

  changeSelectMode() {
    this.selected = !this.selected;
    this.scheduleSrv.selectMode = this.selected;
  }//changeSelectMode

}
