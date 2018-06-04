import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { IListableService } from '../../../toolkit/server/webapi/ilistableService';
import { Material } from '../../../toolkit/models/material';
import { DatePipe } from '@angular/common';
import { MaterialService } from '../../../toolkit/server/webapi/material.service';

@Injectable()
export class MaterialMdService extends PaginatorLaunch {

  createdUrl = 'app/material-detail';
  titleIcon = 'healing';
  title = 'glossary.Material';
  onSelectMode: Subject<boolean> = new Subject();//选择模式
  anyItemSelected: Subject<boolean> = new Subject();//列表至少有一个选择
  multipleSelect: Subject<boolean> = new Subject();//列表有/无选择
  onSelectCategory: Subject<string> = new Subject();//选择分类触发事件
  onSearch: Subject<string> = new Subject();//关键字搜索触发事件
  changeCategoryItems: Subject<void> = new Subject();//改变材料分类
  constructor(protected datePipe: DatePipe,public apiSrv: MaterialService) {
    super(datePipe);
  }

}
