import { Component, OnInit, OnDestroy } from '@angular/core';
import { OContentBase } from '../o-content-base.component';
import { V1ListPageScheduleService } from '../../v1-list-page-schedule.service';
import { CustomListDataSource } from '../../../list-refers/list-refers';
import { takeUntil, skip } from 'rxjs/operators';
import { TextTool } from '../../../../../share/objects/text-tool';
import { UIListBSModelField } from '../../../../../share/models/common';

@Component({
  selector: 'app-v1-list-page-o-content-p-table-list',
  templateUrl: './p-table-list.component.html',
  styleUrls: ['./p-table-list.component.scss']
})
export class PTableListComponent extends OContentBase implements OnInit, OnDestroy {

  columnDefs: Array<{ id: string, name: string, width: number }> = [];
  displayedColumns: string[] = [];
  dataSource = new CustomListDataSource();
  constructor(protected scheduleSrv: V1ListPageScheduleService) {
    super(scheduleSrv);
  }

  ngOnInit() {
    super.ngOnInit();

    this.scheduleSrv.datas$.pipe(takeUntil(this.destroy$)).pipe(skip(1)).subscribe(datas => {
      this.dataSource._dataSubject.next(datas.data);
    });
    this.scheduleSrv.columnDefs$.pipe(takeUntil(this.destroy$)).subscribe(cols => {
      this.displayedColumns = cols.map(x => TextTool.firstLetterLowerCase(x.id));
      this.columnDefs = cols.map(x => {
        return { id: TextTool.firstLetterLowerCase(x.id), name: x.name, width: x.width };
      });
      console.log('p data', this.columnDefs, this.displayedColumns);
    });

  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy
}
