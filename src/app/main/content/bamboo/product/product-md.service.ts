import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProductMdService {

  onSelectMode: Subject<boolean> = new Subject();//选择模式
  anyItemSelected: Subject<boolean> = new Subject();//列表至少有一个选择
  multipleSelect: Subject<boolean> = new Subject();//列表有/无选择
  onSelectCategory: Subject<string> = new Subject();//选择分类触发事件
  onSearch: Subject<string> = new Subject();//关键字搜索触发事件
  changeCategoryItems: Subject<void> = new Subject();//改变产品分类
  constructor() {

  }

}
