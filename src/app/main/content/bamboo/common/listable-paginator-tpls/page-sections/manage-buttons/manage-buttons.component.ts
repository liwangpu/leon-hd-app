import { Component, OnInit } from '@angular/core';
import { SimpleScheduleService } from '../../page-layouts/simple/simple-schedule.service';

@Component({
  selector: 'app-listable-paginator-section-manage-buttons',
  templateUrl: './manage-buttons.component.html',
  styleUrls: ['./manage-buttons.component.scss']
})
export class ManageButtonsComponent implements OnInit {

  constructor(public scheduleSrv: SimpleScheduleService) { }

  ngOnInit() {
  }

  modeChange() {
    this.scheduleSrv.selectMode = !this.scheduleSrv.selectMode;
  }//modeChange
}
