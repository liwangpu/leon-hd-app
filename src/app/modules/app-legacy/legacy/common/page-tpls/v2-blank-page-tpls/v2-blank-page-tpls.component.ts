import { Component, OnInit } from '@angular/core';
import { V1BlankPageTplsComponent } from '../v1-blank-page-tpls/v1-blank-page-tpls.component';

@Component({
  selector: 'app-v2-blank-page-tpls',
  templateUrl: './v2-blank-page-tpls.component.html',
  styleUrls: ['./v2-blank-page-tpls.component.scss']
})
export class V2BlankPageTplsComponent extends V1BlankPageTplsComponent implements OnInit {

  constructor() {
    super();
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
