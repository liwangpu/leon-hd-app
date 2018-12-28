import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeModel, NodeEvent } from 'ng2-tree';

@Component({
  selector: 'app-common-v1-category-select-panel',
  templateUrl: './v1-category-select-panel.component.html',
  styleUrls: ['./v1-category-select-panel.component.scss']
})
export class V1CategorySelectPanelComponent implements OnInit {

  categoryName: string;
  afterCategorySelected$ = new Subject<string>();
  @Input() categoryModel: TreeModel = { value: '默认值' };
  @Output() nodeSelected = new EventEmitter<string>();
  constructor() {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  onSelectCategory(e: NodeEvent) {
    //id为空,说明选中默认分类
    if (!e.node.id)
      e.node.id = '';
    let id = e.node.id.toString();
    this.nodeSelected.next(id);
  }//selectCategory

}
