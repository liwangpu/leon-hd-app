import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-package-detail-group-list-material-item',
  templateUrl: './group-list-material-item.component.html',
  styleUrls: ['./group-list-material-item.component.scss']
})
export class GroupListMaterialItemComponent implements OnInit {

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
