import { Component, OnInit, Input } from '@angular/core';
import { CommonCategoryService } from '../../../../toolkit/server/webapi/common-category.service';
import { CommonCategoryTplsMdService } from './common-category-tpls-md.service';

@Component({
  selector: 'app-common-category-tpls',
  templateUrl: './common-category-tpls.component.html',
  styleUrls: ['./common-category-tpls.component.scss'],
  providers: [CommonCategoryTplsMdService]
})
export class CommonCategoryTplsComponent implements OnInit {

  @Input() titleName: string;
  @Input() iconName: string;
  @Input() launch: CommonCategoryTplsBase;
  constructor(public mdSrv: CommonCategoryTplsMdService) {

  }

  ngOnInit() {
    if (!this.launch)
      return;
    this.mdSrv.apiSrv = this.launch.apiSrv;
  }//ngOnInit

}

export abstract class CommonCategoryTplsBase {
  apiSrv: CommonCategoryService;
}

