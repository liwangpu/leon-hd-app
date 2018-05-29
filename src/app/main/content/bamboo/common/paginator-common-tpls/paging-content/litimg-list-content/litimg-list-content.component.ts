import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorCommonMdService } from '../../paginator-common-md.service';

@Component({
  selector: 'app-commom-paging-litimg-list-content',
  templateUrl: './litimg-list-content.component.html',
  styleUrls: ['./litimg-list-content.component.scss']
})
export class LitimgListContentComponent implements OnInit {

  selectedItem: Array<string> = [];
  constructor(public mdSrv: PaginatorCommonMdService, public router: Router) { }

  ngOnInit() {

  }//ngOnInit

  onItemCheckchange(checked: boolean, id: string) {
    let exist = this.selectedItem.some(x => x == id);
    if (checked) {
      if (!exist)
        this.selectedItem.push(id);
    }
    else {
      if (exist) {
        for (let idx = this.selectedItem.length - 1; idx >= 0; idx--) {
          if (this.selectedItem[idx] == id) {
            this.selectedItem[idx] = undefined;
          }
        }//for
      }//if
    }
    this.mdSrv.selectedItems = this.selectedItem;
  }//onItemCheckchange

}
