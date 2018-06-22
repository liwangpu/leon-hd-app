import { Component, OnInit, OnDestroy } from "@angular/core";
import { fuseAnimations } from "../../../../core/animations";
import { ProductMdService } from "./product-md.service";
import { ProductLeftCategoryMdService } from "./product-left-category-md.service";


@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: fuseAnimations,
  providers: [ProductMdService, ProductLeftCategoryMdService]
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(public mdSrv: ProductMdService, public leftCategoyMdSrv: ProductLeftCategoryMdService) {

  }//constructor

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }//ngOnDestroy


}
