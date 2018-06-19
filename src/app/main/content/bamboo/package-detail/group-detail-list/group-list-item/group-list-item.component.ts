import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-package-detail-group-list-item',
  templateUrl: './group-list-item.component.html',
  styleUrls: ['./group-list-item.component.scss']
})
export class GroupListItemComponent implements OnInit {

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
