import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCategoryMdService } from './product-category-md.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  providers: [ProductCategoryMdService]
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('categoryPanel', {
    read: ViewContainerRef
  }) folderContainer: ViewContainerRef;
  constructor(public mdSrv: ProductCategoryMdService) {

  }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


}
