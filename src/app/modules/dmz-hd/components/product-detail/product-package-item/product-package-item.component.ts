import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-package-item',
  templateUrl: './product-package-item.component.html',
  styleUrls: ['./product-package-item.component.scss']
})
export class ProductPackageItemComponent implements OnInit {

  editMode = false;
  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.editMode = !this.editMode;
  }//edit

}
