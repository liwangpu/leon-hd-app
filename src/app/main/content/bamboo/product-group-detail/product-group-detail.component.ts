import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from '../../../toolkit/server/webapi/product-group.service';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.scss']
})
export class ProductGroupDetailComponent implements OnInit {

  constructor(public apiSrv:ProductGroupService) { }

  ngOnInit() {
  }

}
