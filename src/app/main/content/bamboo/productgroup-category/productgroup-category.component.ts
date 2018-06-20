import { Component, OnInit } from '@angular/core';
import { ProductgroupCategoryMdService } from './productgroup-category-md.service';

@Component({
  selector: 'app-productgroup-category',
  templateUrl: './productgroup-category.component.html',
  styleUrls: ['./productgroup-category.component.scss'],
  providers: [ProductgroupCategoryMdService]
})
export class ProductgroupCategoryComponent implements OnInit {

  constructor(public mdSrv: ProductgroupCategoryMdService) { }

  ngOnInit() {
  }

}
