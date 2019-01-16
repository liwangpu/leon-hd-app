import { Component, OnInit, OnDestroy } from '@angular/core';
import { OContentBase } from '../o-content-base.component';
import { CustomListDataSource } from '../../v1-dy-refers';
import { V1ListPageScheduleService } from '../../v1-list-page-schedule.service';
import { TextTool } from '../../../../../objects/text-tool';
import { takeUntil, skip } from 'rxjs/operators';

@Component({
  selector: 'app-v1-dy-list-page-tpls-o-content-p-table-list',
  templateUrl: './p-table-list.component.html',
  styleUrls: ['./p-table-list.component.scss']
})
export class PTableListComponent extends OContentBase implements OnInit, OnDestroy {

  selectedMode = false;//选择|非选择模式
  columnDefs: Array<{ id: string, name: string, width: number }> = [];
  displayedColumns: string[] = [];
  dataSource = new CustomListDataSource();
  constructor(protected scheduleSrv: V1ListPageScheduleService) {
    super(scheduleSrv);
  }//constructor

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
    //订阅选择模式事件
    this.scheduleSrv.selectMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      this.selectedMode = mode;
      //默认添加select def
      let existSelectedDef = this.columnDefs.some(x => x.id == 'select');
      if (!existSelectedDef)
        this.columnDefs.unshift({ id: 'select', name: 'select', width: 55 });
      let existSelected = this.displayedColumns.some(x => x == 'select');
      //选择模式
      if (mode) {
        if (!existSelected)
          this.displayedColumns.unshift('select');
      }
      else {
        if (existSelected)
          this.displayedColumns.shift();
      }
    });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  onItemSelect(checked: boolean, id: string) {
    if (!this.selectedMode) return;
    if (!checked)
      this.scheduleSrv.addSelectedId(id);
    else
      this.scheduleSrv.removeSelectedId(id);
  }//onItemSelect
}
