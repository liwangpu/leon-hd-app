import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorLaunch, IListTableColumn } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { Product } from '../../../toolkit/models/product';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../toolkit/server/webapi/product.service';

@Injectable()
export class ProductMdService extends PaginatorLaunch {

  createdUrl = 'app/product-detail';
  titleIcon = 'shopping_basket';
  title = 'glossary.Product';
  onSelectMode: Subject<boolean> = new Subject();//选择模式D
  anyItemSelected: Subject<boolean> = new Subject();//列表至少有一个选择
  multipleSelect: Subject<boolean> = new Subject();//列表有/无选择
  onSelectCategory: Subject<string> = new Subject();//选择分类触发事件
  onSearch: Subject<string> = new Subject();//关键字搜索触发事件
  changeCategoryItems: Subject<void> = new Subject();//改变材料分类
  columnDefs: Array<IListTableColumn<Product>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Product) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Product) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Product) => data.description ? data.description : '' }
    , { columnDef: 'categoryName', _columnDef: 'categoryId', header: 'glossary.Category', width: 80, cell: (data: Product) => data.categoryName ? data.categoryName : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Product) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  constructor(protected datePipe: DatePipe, public apiSrv: ProductService) {
    super(datePipe);
  }

}
