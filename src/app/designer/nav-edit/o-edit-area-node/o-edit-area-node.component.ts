import { Component, OnInit } from '@angular/core';
import { OEditBaseComponent } from '../o-edit-base/o-edit-base.component';

@Component({
  selector: 'app-nav-edit-o-edit-area-node',
  templateUrl: './o-edit-area-node.component.html',
  styleUrls: ['./o-edit-area-node.component.scss']
})
export class OEditAreaNodeComponent extends OEditBaseComponent implements OnInit {

  constructor() {
    super();
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

}
