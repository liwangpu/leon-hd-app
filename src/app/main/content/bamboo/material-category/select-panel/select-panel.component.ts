import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TreeModel, NodeEvent } from 'ng2-tree';
import { Subject } from 'rxjs';
import { MaterialCategoryService } from '../../../../toolkit/server/webapi/material-category.service';
import { AssetCategory } from '../../../../toolkit/models/assetcategory';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-material-category-select-panel',
  templateUrl: './select-panel.component.html'
})
export class SelectPanelComponent implements OnInit {

  categoryModel: TreeModel;
  destroy$: Subject<boolean> = new Subject();
  afterCategorySelect: Subject<string> = new Subject();
  @Output() onCategorySelect: EventEmitter<string> = new EventEmitter();
  @Output() onCategorySelectWithDetail: EventEmitter<AssetCategory> = new EventEmitter();
  constructor(protected categorySrv: MaterialCategoryService, private tranSrv: TranslateService) {

  }//constructor

  ngOnInit() {
    this.categorySrv.getAllMaterialCategory().subscribe(resCat => {

      let rootProductName = '';
      let unCategoryName = '';

      //TODO:分类树里面双语言无效
      let transRootProductNameAsync = () => {
        return new Promise((resolve) => {
          this.tranSrv.get('glossary.MaterialCategory').subscribe(msg => {
            rootProductName = msg;
            resolve();
          });
        });//promise
      };//transAsync

      let transCategoryNameAsync = () => {
        return new Promise((resolve) => {
          this.tranSrv.get('glossary.UnCategory').subscribe(msg => {
            unCategoryName = msg;
            resolve();
          });
        });//promise
      };//transAsync


      transRootProductNameAsync().then(transCategoryNameAsync).then(() => {
        resCat.value = rootProductName;
        //添加未分类节点
        let unCategory = { id: '', value: unCategoryName, children: undefined };
        (resCat as TreeModel).children.unshift(unCategory);
        this.clearChildren(resCat as TreeModel);
        this.categoryModel = resCat;

      });//
    });
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  clearChildren(obj: TreeModel) {

    if (!obj.children) return;

    if (obj.children.length === 0) {
      obj.children = undefined;
    }
    else {
      for (let child of obj.children) {
        this.clearChildren(child);
      }
    }
  }//clearChildren

  /**
   * 分类节点选中
   * @param e 
   */
  selectCategory(e: NodeEvent): void {
    let id = e.node.id.toString();
    this.onCategorySelect.next(id);
    this.afterCategorySelect.next(id);
    var cate = new AssetCategory();
    cate.id = id;
    cate.name = e.node.value;
    this.onCategorySelectWithDetail.next(cate);
  }//selectCategory

}
