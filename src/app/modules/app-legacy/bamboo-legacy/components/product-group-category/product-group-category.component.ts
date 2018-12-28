import { Component, OnInit } from '@angular/core';
import { ProductGroupCategoryMdService } from './product-group-category-md.service';

@Component({
  selector: 'app-product-group-category',
  templateUrl: './product-group-category.component.html',
  styleUrls: ['./product-group-category.component.scss'],
  providers: [ProductGroupCategoryMdService]
})
export class ProductGroupCategoryComponent implements OnInit {

  constructor(public mdSrv: ProductGroupCategoryMdService) { }

  ngOnInit() {
  }

}
