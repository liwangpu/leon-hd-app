import { Component, OnInit } from '@angular/core';
import { ProductReplaceGroupPaginatorLaunchService } from './product-replace-group-paginator-launch.service';
import { ProductLeftCategoryLaunchService } from '../product/product-left-category-launch.service';

@Component({
  selector: 'app-product-replace-group',
  templateUrl: './product-replace-group.component.html',
  styleUrls: ['./product-replace-group.component.scss'],
  providers: [ProductReplaceGroupPaginatorLaunchService, ProductLeftCategoryLaunchService]
})
export class ProductReplaceGroupComponent implements OnInit {

  constructor(public launch: ProductReplaceGroupPaginatorLaunchService, public leftCategoyMdSrv: ProductLeftCategoryLaunchService) { }

  ngOnInit() {
  }

}
