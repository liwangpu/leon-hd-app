import { Component, OnInit, forwardRef } from '@angular/core';
import { CustomTabBaseExtend } from '../../common/detail-edit-tpls/detail-info-tab/detail-info-tab.component';

@Component({
  selector: 'app-package-detail-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss'],
  providers: [{ provide: CustomTabBaseExtend, useExisting: forwardRef(() => DetailContentComponent) }]
})
export class DetailContentComponent extends CustomTabBaseExtend implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }//ngOnInit

}
