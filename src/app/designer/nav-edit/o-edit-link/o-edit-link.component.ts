import { Component, OnInit } from '@angular/core';
import { OEditBaseComponent } from '../o-edit-base/o-edit-base.component';

@Component({
  selector: 'app-nav-edit-o-edit-link',
  templateUrl: './o-edit-link.component.html',
  styleUrls: ['./o-edit-link.component.scss']
})
export class OEditLinkComponent extends OEditBaseComponent implements OnInit {

  constructor() {
    super();
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}

