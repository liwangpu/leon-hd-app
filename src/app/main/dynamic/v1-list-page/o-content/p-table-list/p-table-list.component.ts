import { Component, OnInit, OnDestroy } from '@angular/core';
import { OContentBase } from '../o-content-base.component';
import { V1ListPageScheduleService } from '../../v1-list-page-schedule.service';
import { CustomListDataSource } from '../../../list-refers/list-refers';

@Component({
  selector: 'app-v1-list-page-o-content-p-table-list',
  templateUrl: './p-table-list.component.html',
  styleUrls: ['./p-table-list.component.scss']
})
export class PTableListComponent extends OContentBase implements OnInit, OnDestroy {

  displayedColumns: string[] = ['seqno'];
  dataSource = new CustomListDataSource();
  constructor(protected scheduleSrv: V1ListPageScheduleService) {
    super(scheduleSrv);
  }

  ngOnInit() {
    super.ngOnInit();

    let ddd = [];
    let idx = 0;
    setInterval(() => {
      console.log(new Date, ddd);
      idx++;
      let model = {
        seqno: idx
      };
      ddd.push(model);
      this.dataSource._dataSubject.next(ddd);
    }, 5000);
    
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy
}
