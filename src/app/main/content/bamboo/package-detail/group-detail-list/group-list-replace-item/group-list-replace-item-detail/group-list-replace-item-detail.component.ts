import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-package-detail-group-list-replace-item-detail',
  templateUrl: './group-list-replace-item-detail.component.html',
  styleUrls: ['./group-list-replace-item-detail.component.scss']
})
export class GroupListReplaceItemDetailComponent implements OnInit {

  @Input() isDefault = false;
  @Input() itemId: string;
  @Input() itemName: string;
  @Output() onDeleteItem = new EventEmitter<{ id: string, icon: string, name: string }>();
  @Output() onSettingItem = new EventEmitter<{ id: string, icon: string, name: string }>();
  constructor() { }

  ngOnInit() {
  }//ngOnInit

  _settingItem() {
    if (!this.isDefault)
      this.onSettingItem.next({ id: this.itemId, name: this.itemName, icon: '' });
  }//_settingItem

  _deleteItem() {
    this.onDeleteItem.next({ id: this.itemId, name: this.itemName, icon: '' });
  }//_deleteItem
}
