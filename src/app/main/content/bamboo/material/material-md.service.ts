import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorLaunch, IListTableColumn } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { IListableService } from '../../../toolkit/server/webapi/ilistableService';
import { Material } from '../../../toolkit/models/material';
import { DatePipe } from '@angular/common';
import { MaterialService } from '../../../toolkit/server/webapi/material.service';

@Injectable()
export class MaterialMdService extends PaginatorLaunch {

  createdUrl = 'app/material-detail';
  titleIcon = 'healing';
  title = 'glossary.Material';
  onSelectMode: Subject<boolean> = new Subject();//选择模式D
  anyItemSelected: Subject<boolean> = new Subject();//列表至少有一个选择
  multipleSelect: Subject<boolean> = new Subject();//列表有/无选择
  onSelectCategory: Subject<string> = new Subject();//选择分类触发事件
  onSearch: Subject<string> = new Subject();//关键字搜索触发事件
  changeCategoryItems: Subject<void> = new Subject();//改变材料分类
  columnDefs: Array<IListTableColumn<Material>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Material) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Material) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Material) => data.description ? data.description : '' }
    , { columnDef: 'categoryName',_columnDef:'categoryId', header: 'glossary.Category', width: 80, cell: (data: Material) => data.categoryName ? data.categoryName : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Material) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: MaterialService) {
    super(datePipe);
  }

}
