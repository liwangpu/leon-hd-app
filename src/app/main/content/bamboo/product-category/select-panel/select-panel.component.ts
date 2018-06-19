import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { TreeModel, NodeEvent } from 'ng2-tree';
import { ProductCategoryService } from '../../../../toolkit/server/webapi/productcategory.service';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AssetCategory } from '../../../../toolkit/models/assetcategory';

@Component({
  selector: 'app-product-category-select-panel',
  templateUrl: './select-panel.component.html',
  styleUrls: ['./select-panel.component.scss']
})
export class SelectPanelComponent implements OnInit, OnDestroy {
  categoryModel: TreeModel;
  destroy$: Subject<boolean> = new Subject();
  afterCategorySelect: Subject<string> = new Subject();
  @Input() addUnCategoryNode = true;
  @Output() onCategorySelect: EventEmitter<string> = new EventEmitter();
  @Output() onCategorySelectWithDetail: EventEmitter<AssetCategory> = new EventEmitter();
  constructor(protected categorySrv: ProductCategoryService, private tranSrv: TranslateService) {

  }//constructor

  ngOnInit() {
    this.categorySrv.getAllProductCategory().subscribe(resCat => {

      let rootProductName = '';
      let unCategoryName = '';

      //TODO:分类树里面双语言无效
      let transRootProductNameAsync = () => {
        return new Promise((resolve) => {
          this.tranSrv.get('glossary.ProductCategory').subscribe(msg => {
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
        if (this.addUnCategoryNode) {
          //添加未分类节点
          let unCategory = { id: '', value: unCategoryName, children: undefined };
          (resCat as TreeModel).children.unshift(unCategory);
        }
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


