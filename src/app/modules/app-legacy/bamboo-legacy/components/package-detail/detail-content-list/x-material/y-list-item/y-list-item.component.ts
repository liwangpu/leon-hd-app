import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-package-detail-content-list-x-material-y-list-item',
  templateUrl: './y-list-item.component.html',
  styleUrls: ['./y-list-item.component.scss']
})
export class YListItemComponent implements OnInit {

  canSave = false;
  @Input() itemId: string;
  @Input() itemLastName: string;
  @Input() itemName: string;
  @Input() iconUrl: string;
  @Output() onDelete = new EventEmitter<{ id: string, name: string, lastName: string }>();
  @Output() onSave = new EventEmitter<{ id: string, name: string, lastName: string }>();
  constructor() { }

  ngOnInit() {

  }//

  deleteItem() {
    this.onDelete.next({ id: this.itemId, name: this.itemName, lastName: this.itemLastName });
  }//deleteItem

  saveItem() {
    this.onSave.next({ id: this.itemId, name: this.itemName, lastName: this.itemLastName });
  }//saveItem

  onNameChange(name: string) {
    this.itemName = name;
    this.canSave = name && name.length > 0 ? true : false;
  }//onNameChange
}
