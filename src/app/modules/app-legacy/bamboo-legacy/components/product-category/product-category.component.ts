import { Component, OnInit } from '@angular/core';
import { ProductCategoryMdService } from './product-category-md.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  providers: [ProductCategoryMdService]
})
export class ProductCategoryComponent implements OnInit {

  // destroy$ = new Subject<boolean>();
  // @ViewChild('categoryPanel', {
  //   read: ViewContainerRef
  // }) folderContainer: ViewContainerRef;
  constructor(public mdSrv: ProductCategoryMdService) {

  }

  ngOnInit() {

  }//ngOnInit

}
