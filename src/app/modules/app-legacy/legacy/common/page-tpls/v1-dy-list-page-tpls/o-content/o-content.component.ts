import { Component, OnInit } from '@angular/core';
import { V1ListPageScheduleService } from '../v1-list-page-schedule.service';

@Component({
  selector: 'app-v1-dy-list-page-tpls-o-content',
  templateUrl: './o-content.component.html',
  styleUrls: ['./o-content.component.scss']
})
export class OContentComponent implements OnInit {

  displayModel: string;
  constructor(protected scheduleSrv: V1ListPageScheduleService) {

  }//constructor

  ngOnInit() {
    //订阅列表内容显示改变事件
    this.scheduleSrv.displayModel$.subscribe(mode => {
      // console.log('this.scheduleSrv.displayModel$ ', mode);
      this.displayModel = mode;
    });
  }//ngOnInit
}
