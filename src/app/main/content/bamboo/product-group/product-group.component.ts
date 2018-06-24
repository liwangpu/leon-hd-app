import { Component, OnInit } from '@angular/core';
import { ProductGroupMdService } from './product-group-md.service';
import { ProductGroupLeftCategoryMdService } from './product-group-left-category-md.service';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss'],
  providers: [ProductGroupMdService, ProductGroupLeftCategoryMdService]
})
export class ProductGroupComponent implements OnInit {

  constructor(public mdSrv: ProductGroupMdService, public leftCategoyMdSrv: ProductGroupLeftCategoryMdService) {

  }//constructor

  ngOnInit() {
  }

}
