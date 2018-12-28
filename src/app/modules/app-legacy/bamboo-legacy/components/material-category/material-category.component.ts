import { Component, OnInit } from '@angular/core';
import { MaterialCategoryMdService } from './material-category-md.service';

@Component({
  selector: 'app-material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.scss'],
  providers: [MaterialCategoryMdService]
})
export class MaterialCategoryComponent implements OnInit {

  constructor(public mdSrv: MaterialCategoryMdService) { }

  ngOnInit() {
  }//ngOnInit

}
