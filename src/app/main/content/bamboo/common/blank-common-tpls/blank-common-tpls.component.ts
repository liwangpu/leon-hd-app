import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blank-common-tpls',
  templateUrl: './blank-common-tpls.component.html',
  styleUrls: ['./blank-common-tpls.component.scss']
})
export class BlankCommonTplsComponent implements OnInit {
  arr = [];
  @Input() titleName: string;
  @Input() iconName: string;
  constructor() {


  }

  ngOnInit() {
    for (let idx = 100; idx >= 0; idx--) {
      this.arr.push(idx);
    }
  }

}
