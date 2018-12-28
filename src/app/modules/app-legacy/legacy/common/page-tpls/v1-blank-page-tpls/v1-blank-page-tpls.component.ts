import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-v1-blank-page-tpls',
  templateUrl: './v1-blank-page-tpls.component.html',
  styleUrls: ['./v1-blank-page-tpls.component.scss']
})
export class V1BlankPageTplsComponent implements OnInit {

  @Input() titleName: string;
  @Input() iconName: string;
  constructor() { }

  ngOnInit() {
  }

}
