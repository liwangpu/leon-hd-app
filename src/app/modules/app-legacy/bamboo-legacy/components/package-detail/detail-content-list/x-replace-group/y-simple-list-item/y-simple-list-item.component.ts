import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { SimpleIconListItemComponent } from '@app/app-legacy';
// import { SimpleIconListItemComponent } from '../../../../../share/common/page-tpls/simple-icon-list-page/simple-icon-list-item/simple-icon-list-item.component';

@Component({
  selector: 'app-package-detail-content-list-x-replace-group-y-simple-list-item',
  templateUrl: './y-simple-list-item.component.html',
  styleUrls: ['./y-simple-list-item.component.scss'],
  providers: [{ provide: SimpleIconListItemComponent, useExisting: forwardRef(() => YSimpleListItemComponent) }]
})
export class YSimpleListItemComponent extends SimpleIconListItemComponent implements OnInit {

  @Input() details: Array<{ id: string, name: string }> = [];
  constructor() {
    super();
  }//constructor

  get description() {
    if (this.details && this.details.length > 0)
      return this.details.map(x => x.name).join(',');
    return '';
  }

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  clearSelect() {
    this.selected = false;
  }

  toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.next({ id: this.fid, seleted: this.selected });
  }//

}
