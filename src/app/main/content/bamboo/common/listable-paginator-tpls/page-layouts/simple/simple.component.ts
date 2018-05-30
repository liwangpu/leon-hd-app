import { Component, OnInit } from '@angular/core';
import { SimpleScheduleService } from './simple-schedule.service';

@Component({
  selector: 'app-listable-layout-tpls-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  providers: [SimpleScheduleService]
})
export class SimpleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
