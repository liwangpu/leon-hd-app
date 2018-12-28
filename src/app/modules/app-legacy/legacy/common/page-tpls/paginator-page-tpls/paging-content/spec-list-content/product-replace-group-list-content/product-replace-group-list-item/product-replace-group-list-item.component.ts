import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductReplaceGroupService } from '../../../../../../../services/webapis/product-replace-group.service';
import { AsyncHandleService } from '../../../../../../../services/common/async-handle.service';
import { PaginatorCommonMdService } from '../../../../paginator-common-md.service';

@Component({
  selector: 'app-commom-paging-product-replace-group-list-item',
  templateUrl: './product-replace-group-list-item.component.html',
  styleUrls: ['./product-replace-group-list-item.component.scss']
})
export class ProductReplaceGroupListItemComponent implements OnInit {

  collapsed = true;
  @Input() Selected: boolean;
  @Input() idx: string;
  @Input() fid: string;
  @Input() icon: string;
  @Input() title: string;
  @Input() details: Array<{ id: string, name: string }> = [];
  @Output() OnCheckChange = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<string>();
  constructor(protected groupSvr: ProductReplaceGroupService, protected asyncHandle: AsyncHandleService, public mdSrv: PaginatorCommonMdService) { }

  ngOnInit() {
  }//ngOnInit

  unCollapse() {
    this.collapsed = !this.collapsed;
  }//unCollapse

  setDefault(itemId: string) {
    let source$ = this.groupSvr.setDefault({ id: this.fid, itemId: itemId });
    this.asyncHandle.asyncRequest(source$).subscribe((res) => {
      this.details = res.groupItems;
    });
  }//setDefault

  deleteItem(itemId: string) {
    let source$ = this.groupSvr.removeItem({ id: this.fid, itemId: itemId });
    this.asyncHandle.asyncRequest(source$).subscribe((res) => {
      this.details = res.groupItems;
      if (!res.id)
        this.onDelete.next(this.fid);
    });
  }//deleteItem

  selectedChange(checked: boolean) {
    this.Selected = checked;
    this.OnCheckChange.next(checked);
  }//selectedChange

}
