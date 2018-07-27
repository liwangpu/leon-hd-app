import { Component, OnInit } from '@angular/core';
import { ProductGroupPaginatorLaunchService } from './product-group-paginator-launch.service';
import { ProductGroupLeftCategoryLaunchService } from './product-group-left-category-launch.service';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss'],
  providers: [ProductGroupPaginatorLaunchService, ProductGroupLeftCategoryLaunchService]
})
export class ProductGroupComponent implements OnInit {

  constructor(public launch: ProductGroupPaginatorLaunchService, public leftCategoyMdSrv: ProductGroupLeftCategoryLaunchService) { }

  ngOnInit() {
  }

}
