import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { PaginatorStore } from '../../../../toolkit/common/classes/paginator-store';
import { Subject } from 'rxjs';
import { Material } from '../../../../toolkit/models/material';
import { MatPaginator, MatCheckboxChange } from '@angular/material';
import { IconItemComponent } from '../../common/iconitem.component';
import { MaterialService } from '../../../../toolkit/server/webapi/material.service';
import { PathService } from '../../../services/path.service';
import { MaterialMdService } from '../material-md.service';
import { DialogFactoryService } from '../../../../toolkit/common/factory/dialog-factory.service';
import { ChangeCategorySuitComponent } from '../change-category-suit.component';
import { IQueryFilter } from '../../../../toolkit/common/interfaces/iqueryFilter';

@Component({
  selector: 'app-material-view-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
  selectedCategory: string;
  isSelectMode: boolean;//是否出于选择模式
  allSelect: boolean;//是否全选状态
  productItems: any[];
  dataStore: PaginatorStore<Material>;
  destroy$: Subject<boolean> = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(IconItemComponent) iconItems: QueryList<IconItemComponent>;
  constructor(public productSrv: MaterialService, public pathSrv: PathService, public mdSrv: MaterialMdService, protected dialogFac: DialogFactoryService) {

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
    this.dataStore = new PaginatorStore<Material>({ service: this.productSrv, paginator: this.paginator });
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
    let dialog = this.dialogFac.tplsConfirm('选择分类', ChangeCategorySuitComponent, { width: '450px', height: '550px', data: { ids: ids } });

    dialog.afterOpen().first().subscribe(() => {
      (dialog.componentInstance.componentIns as ChangeCategorySuitComponent).afterChangeCategory.subscribe(() => {
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
