import { Component, OnInit } from '@angular/core';
import { SimpleIconListPageComponent } from '../../../../../share/common/page-tpls/simple-icon-list-page/simple-icon-list-page.component';

@Component({
  selector: 'app-package-detail-content-list-x-replace-group-y-simple-list',
  templateUrl: './y-simple-list.component.html',
  styleUrls: ['./y-simple-list.component.scss']
})
export class YSimpleListComponent extends SimpleIconListPageComponent implements OnInit {

  constructor() {
    super();
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
