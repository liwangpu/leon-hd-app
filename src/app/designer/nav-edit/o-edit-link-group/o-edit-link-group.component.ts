import { Component, OnInit } from '@angular/core';
import { OEditBaseComponent } from '../o-edit-base/o-edit-base.component';

@Component({
  selector: 'app-nav-edit-o-edit-link-group',
  templateUrl: './o-edit-link-group.component.html',
  styleUrls: ['./o-edit-link-group.component.scss']
})
export class OEditLinkGroupComponent extends OEditBaseComponent implements OnInit {

  constructor() {
    super();
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}

