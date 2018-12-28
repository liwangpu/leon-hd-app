import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-working-time-calculate',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.scss']
})
export class WorkingTimeComponent implements OnInit, OnDestroy {

  title = '耗时';
  hours = 0;
  minutes = 0;
  seconds = 0;
  timeHandle: any;
  constructor() { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.stop();
  }//ngOnDestroy

  start() {
    this.stop();
    this.init();
    this.calc();
  }//start

  stop() {
    if (this.timeHandle)
      clearInterval(this.timeHandle);
  }//stop

  init() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }//init

  calc() {
    this.timeHandle = setInterval(() => {
      let s = this.seconds;
      let m = this.minutes;
      let h = this.hours;

      if (s >= 59) {
        s = 0;
        m++;
        if (m >= 59) {
          m = 0;
          h++;
          if (h >= 59) {
            h = 0;
          }
        } else {
          m++;
        }
      } else {
        s++;
      }//if

      this.seconds = s;
      this.minutes = m;
      this.hours = h;
    }, 1000);
  }//calc

  showTimePart(part: number) {
    if (part < 10)
      return '0' + part;
    return part;
  }//showTimePart
}
