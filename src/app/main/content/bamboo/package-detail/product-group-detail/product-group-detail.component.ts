import { Component, OnInit, forwardRef } from '@angular/core';
import { CustomTabBaseExtend } from '../../common/detail-edit-tpls/detail-info-tab/detail-info-tab.component';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.scss'],
  providers: [{ provide: CustomTabBaseExtend, useExisting: forwardRef(() => ProductGroupDetailComponent) }]
})
export class ProductGroupDetailComponent extends CustomTabBaseExtend implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }//ngOnInit

}
