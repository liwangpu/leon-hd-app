import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../share/services/webapis/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(public apiSrv: ProductService) { }

  ngOnInit() {
  }

}
