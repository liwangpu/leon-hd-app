import { Component, OnInit } from '@angular/core';
import { OEditBaseComponent } from '../o-edit-base/o-edit-base.component';
import { FormBuilder } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-nav-edit-o-edit-area-node',
  templateUrl: './o-edit-area-node.component.html',
  styleUrls: ['./o-edit-area-node.component.scss']
})
export class OEditAreaNodeComponent extends OEditBaseComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder) {
    super(formBuilder);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    console.log('uuu',this.currentNode);
  }//ngOnInit

}
