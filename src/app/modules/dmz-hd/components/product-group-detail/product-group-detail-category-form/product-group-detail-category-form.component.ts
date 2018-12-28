import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-group-detail-category-form',
  templateUrl: './product-group-detail-category-form.component.html',
  styleUrls: ['./product-group-detail-category-form.component.scss']
})
export class ProductGroupDetailCategoryFormComponent implements OnInit, OnDestroy {

  data: any;
  enableConfirm = false;
  afterSelected$ = new Subject<{ id: string, name: string }>();
  constructor() { }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSelected$.complete();
    this.afterSelected$.unsubscribe();
  }//ngOnDestroy

  onCategoryNodeItemSelected(item: any) {
    if (!item) return;
    this.enableConfirm = item && item.id ? true : false;
    this.data = { id: item.id, name: item.name };

  }//onCategoryNodeSelected

  afterConfirm() {
    this.afterSelected$.next(this.data);
  }//afterConfirm
}
