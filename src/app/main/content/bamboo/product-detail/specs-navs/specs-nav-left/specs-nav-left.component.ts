// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-specs-nav-left',
//   templateUrl: './specs-nav-left.component.html',
//   styleUrls: ['./specs-nav-left.component.scss']
// })
// export class SpecsNavLeftComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../../../core/animations';
import { ProductDetailService } from "../../product-detail.service";

@Component({
  selector: 'app-specs-nav-left',
  templateUrl: './specs-nav-left.component.html',
  styleUrls: ['./specs-nav-left.component.scss'],
  animations: fuseAnimations
})
export class SpecsNavLeftComponent implements OnInit {
  view: string;

  constructor(private detailService: ProductDetailService) {
    this.view = 'specs';
  }

  ngOnInit() {
    this.detailService.onLeftSidenavViewChanged.subscribe(view => {
      this.view = view;
    });
  }

}
