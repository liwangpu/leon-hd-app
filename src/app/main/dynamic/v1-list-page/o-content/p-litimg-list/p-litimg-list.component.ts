import { Component, OnInit } from '@angular/core';
import { OContentBase } from '../o-content-base.component';
import { V1ListPageScheduleService } from '../../v1-list-page-schedule.service';

@Component({
  selector: 'app-v1-list-page-o-content-p-litimg-list',
  templateUrl: './p-litimg-list.component.html',
  styleUrls: ['./p-litimg-list.component.scss']
})
export class PLitimgListComponent extends OContentBase implements OnInit {

  constructor(protected scheduleSrv: V1ListPageScheduleService) {
    super(scheduleSrv);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
