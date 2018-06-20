import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-package-detail-group-list-replace-item',
  templateUrl: './group-list-replace-item.component.html',
  styleUrls: ['./group-list-replace-item.component.scss']
})
export class GroupListReplaceItemComponent implements OnInit, OnChanges {

  defaultItem: { id: string, icon: string, name: string };
  @Input() items: Array<{ id: string, icon: string, name: string }> = [];
  @Output() onDeleteItem = new EventEmitter<{ id: string, icon: string, name: string }>();
  @Output() onDeleteDetailItem = new EventEmitter<{ id: string, icon: string, name: string }>();
  @Output() onSettingDetailItem = new EventEmitter<{ id: string, icon: string, name: string, defaultId: string }>();
  constructor() { }

  ngOnInit() {
  }//ngOnInit

  ngOnChanges(changes: SimpleChanges): void {
    let itemsChange = changes['items'];
    if (itemsChange.currentValue && itemsChange.currentValue.length > 0) {
      this.defaultItem = itemsChange.currentValue[0];
    }
  }//ngOnChanges

  _deleteItem() {
    this.onDeleteItem.next(this.defaultItem);
  }//deleteItem

  _deleteDetailItem(data: { id: string, icon: string, name: string, defaultId: string }) {
    data.defaultId = this.defaultItem.id;
    this.onDeleteDetailItem.next(data);
  }//_deleteDetailItem

  _onSettingDetailItem(data: { id: string, icon: string, name: string, defaultId: string }) {
    data.defaultId = this.defaultItem.id;
    this.onSettingDetailItem.next(data);
  }//_onSettingDetailItem
}
