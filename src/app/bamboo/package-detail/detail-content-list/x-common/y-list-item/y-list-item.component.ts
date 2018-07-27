import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-package-detail-content-list-x-common-app-y-list-item',
  templateUrl: './y-list-item.component.html',
  styleUrls: ['./y-list-item.component.scss']
})
export class YListItemComponent implements OnInit {

  selected = false;
  @Input() itemId: string;
  @Input() itemName: string;
  @Input() itemDescription: string;
  @Input() iconUrl: string;
  @Output() onDelete = new EventEmitter<{ id: string, name: string }>();
  constructor() { }

  ngOnInit() {

  }//

  deleteItem() {
    this.onDelete.next({ id: this.itemId, name: this.itemName });
  }//deleteItem
}
