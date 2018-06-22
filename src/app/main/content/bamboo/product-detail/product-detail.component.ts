import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../toolkit/server/webapi/product.service';
import { ProductDetailMdService } from './product-detail-md.service';
import { ProductDetailCategoryMdService } from './basic-info/category-change-suit.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ProductDetailMdService, ProductDetailCategoryMdService]
})
export class ProductDetailComponent implements OnInit {

  constructor(public apiSrv: ProductService) { }

  ngOnInit() {
  }

}
