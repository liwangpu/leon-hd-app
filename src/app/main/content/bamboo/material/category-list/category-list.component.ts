import { Component, OnInit } from '@angular/core';
import { MaterialMdService } from '../material-md.service';

@Component({
  selector: 'app-material-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  constructor(public mdSrv: MaterialMdService) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  onCategorySelect(catId: string) {
    this.mdSrv.onSelectCategory.next(catId);
  }//onCategorySelect

}
