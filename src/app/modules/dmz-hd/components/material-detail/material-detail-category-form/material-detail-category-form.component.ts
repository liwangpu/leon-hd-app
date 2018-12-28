import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-material-detail-category-form',
  templateUrl: './material-detail-category-form.component.html',
  styleUrls: ['./material-detail-category-form.component.scss']
})
export class MaterialDetailCategoryFormComponent implements OnInit, OnDestroy {

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
