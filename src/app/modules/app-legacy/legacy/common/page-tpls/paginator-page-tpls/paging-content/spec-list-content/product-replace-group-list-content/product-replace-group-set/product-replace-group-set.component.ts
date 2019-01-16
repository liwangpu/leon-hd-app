import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-commom-paging-product-replace-group-set',
  templateUrl: './product-replace-group-set.component.html',
  styleUrls: ['./product-replace-group-set.component.scss']
})
export class ProductReplaceGroupSetComponent implements OnInit {

  @Input() idx: number;
  @Input() fid: string;
  @Input() title: string;
  @Output() setDefault = new EventEmitter<string>();
  @Output() deleteItem = new EventEmitter<string>();
  get isDefault() {
    return this.idx <= 1;
  }

  constructor() {

  }//constructor

  ngOnInit() {
  }//ngOnInit

  _setDefault() {
    if (this.isDefault)
      return;
    this.setDefault.next(this.fid);
  }//_setDefault

  _deleteItem() {
    this.deleteItem.next(this.fid);
  }//_deleteItem
}
