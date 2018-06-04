import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { PaginatorStore } from '../../../../toolkit/common/classes/paginator-store';
import { MatPaginator, MatCheckboxChange } from '@angular/material';
import { ProductService } from '../../../../toolkit/server/webapi/product.service';
import { Subject } from 'rxjs';
import { PathService } from '../../../services/path.service';
import { Product } from '../../../../toolkit/models/product';
import { ProductMdService } from '../product-md.service';
import { IconItemComponent } from '../../common/iconitem.component';
import { IQueryFilter } from '../../../../toolkit/common/interfaces/iqueryFilter';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { ChangeCategoryComponent } from '../change-category.component';


@Component({
  selector: 'app-product-view-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  selectedCategory: string;
  isSelectMode: boolean;//是否出于选择模式
  allSelect: boolean;//是否全选状态
  productItems: any[];
  dataStore: PaginatorStore<Product>;
  destroy$: Subject<boolean> = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(IconItemComponent) iconItems: QueryList<IconItemComponent>;
  constructor(public productSrv: ProductService, public pathSrv: PathService, public mdSrv: ProductMdService, protected dialogFac: DialogFactoryService) {

    this.mdSrv.onSelectMode.takeUntil(this.destroy$).subscribe(sel => {
      if (sel) {
        this.answerSelectMode();
        this.isSelectMode = true;
      }
      else {
        this.allSelect = false;
        this.isSelectMode = false;
      }
    });//订阅

    this.mdSrv.multipleSelect.takeUntil(this.destroy$).subscribe(sel => {
      this.answerSelectAll(sel);
    });//订阅

    this.mdSrv.onSelectCategory.takeUntil(this.destroy$).subscribe(catId => {
      this.selectedCategory = catId;
      this.onCategorySelect();
    });//订阅


    this.mdSrv.onSearch.takeUntil(this.destroy$).subscribe(search => {
      this.dataStore.filter = search;
    })//订阅

    this.mdSrv.changeCategoryItems.takeUntil(this.destroy$).subscribe(() => {
      this.chagneCategories();
    });//订阅
  }
  ngOnInit() {
    this.dataStore = new PaginatorStore<Product>({ service: this.productSrv, paginator: this.paginator });
    this.dataStore._dataSubject.takeUntil(this.destroy$).subscribe(res => {
      this.paginator.length = res.total;
      this.productItems = res.data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  selectAll(ev: MatCheckboxChange) {
    this.mdSrv.multipleSelect.next(ev.checked);
  }//selectAll

  answerSelectMode(select = false) {
    this.allSelect = select;
  }//selectMode

  answerSelectAll(select: boolean) {
    this.allSelect = select;
  }//answerUnSelectMode

  onItemCheckchange(selected: boolean) {
    let anyItemSelected = false;
    this.iconItems.forEach(item => {
      if (item.Selected) {
        anyItemSelected = true;
        return;
      }
    });//forEach

    this.mdSrv.anyItemSelected.next(anyItemSelected);
  }//onItemCheckchange


  chagneCategories() {

    let ids = this.getSelectItemIds();
    let dialog = this.dialogFac.tplsConfirm(ChangeCategoryComponent, '选择分类', { width: '450px', height: '550px', data: { ids: ids } });

    dialog.afterOpen().first().subscribe(() => {
      (dialog.componentInstance.componentIns as ChangeCategoryComponent).afterChangeCategory.subscribe(() => {
        this.onCategorySelect();
        this.mdSrv.anyItemSelected.next(false);
      });
    });
  }//onGetSelectItems


  getSelectItemIds(): string {
    let ids = '';
    this.iconItems.forEach(item => {
      if (item.Selected)
        ids += `${item.Id},`;
    });//forEach
    return ids;
  }//getSelectItemIds

  onCategorySelect() {
    let filter: IQueryFilter;
    if (this.selectedCategory) {
      filter = { field: 'categoryId', value: this.selectedCategory };
    }
    else {
      filter = { field: 'classify', value: 'false' };
    }
    this.dataStore.advanceFilter = [filter];
  }//onCategorySelect

}
