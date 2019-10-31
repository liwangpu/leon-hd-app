import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-replace-group-item',
  templateUrl: './product-replace-group-item.component.html',
  styleUrls: ['./product-replace-group-item.component.scss']
})
export class ProductReplaceGroupItemComponent implements OnInit {

  @Input() icon: string;
  @Input() items: Array<{ id: string, name: string }> = [];
  constructor() { }

  ngOnInit() {
  }

}
