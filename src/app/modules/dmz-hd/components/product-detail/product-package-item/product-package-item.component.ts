import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-package-item',
  templateUrl: './product-package-item.component.html',
  styleUrls: ['./product-package-item.component.scss']
})
export class ProductPackageItemComponent implements OnInit {

  @Input() editMode = false;
  @Input() packageId: string;
  @Input() packageName: string;
  @Input() packageNum: number;
  @Input() packageRemark: string;
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {

  }//ngOnInit

  onEdit() {
    if (this.editMode) {
      this.save.next({
        id: this.packageId,
        name: this.packageName,
        num: this.packageNum,
        description: this.packageRemark
      });
    }
    this.editMode = !this.editMode;
  }//onEdit

  onDelete() {
    this.delete.next(this.packageId ? this.packageId : undefined);
  }//onDelete


}
