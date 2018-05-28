import { Component, OnInit, Input } from '@angular/core';
import { PaginatorCommonMdService } from '../paginator-common-md.service';
import { Subject } from 'rxjs';
import { ListDisplayModeEnum } from '../paginator-common-tpls.component';

@Component({
  selector: 'app-paginator-page-manage-button',
  templateUrl: './page-manage-button.component.html',
  styleUrls: ['./page-manage-button.component.scss']
})
export class PageManageButtonComponent implements OnInit {
  readDataOnly: boolean;//只读数据,不显示数据操作按钮
  viewMode = true;//查看模式,数据没有checkbox勾选
  @Input() createUrl: string;
  @Input() dataDisplayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;//列表数据显示模式 列表或卡片等等
  destroy$: Subject<boolean> = new Subject();
  constructor(protected mdSrv: PaginatorCommonMdService) {

    //订阅列表数据编辑模式 true=>只读模式
    this.mdSrv.readDataOnly$.takeUntil(this.destroy$).subscribe(readDataMode => {
      this.readDataOnly = readDataMode;
    });//
  }//

  ngOnInit() {

  }//

  modeChange() {
    this.mdSrv.selectMode$.next(this.viewMode);
    this.viewMode = !this.viewMode;
  }//modeChange



}
