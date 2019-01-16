import { Component, forwardRef } from '@angular/core';
import { CustomTabBaseExtend } from '@app/app-legacy';
// import { CustomTabBaseExtend } from '../../../share/common/page-tpls/detail-page-tpls/detail-edit-refers';

@Component({
  selector: 'app-package-detail-content-ex',
  templateUrl: './detail-content-ex.component.html',
  styleUrls: ['./detail-content-ex.component.scss'],
  providers: [{ provide: CustomTabBaseExtend, useExisting: forwardRef(() => DetailContentExComponent) }]
})
export class DetailContentExComponent extends CustomTabBaseExtend {

  constructor() {
    super();
  }

}
