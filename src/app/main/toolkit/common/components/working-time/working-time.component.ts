import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-working-time-calculate',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.scss']
})
export class WorkingTimeComponent implements OnInit {

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  constructor() { }

  ngOnInit() {

  }//ngOnInit

  start() {
    this.init();
  }//start

  init() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }//init

  showTimePart(part: number) {
    if (part < 10)
      return '0' + part;
    return part;
  }//showTimePart
}
