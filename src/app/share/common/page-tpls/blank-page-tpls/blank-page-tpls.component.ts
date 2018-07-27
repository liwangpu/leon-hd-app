import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blank-page-tpls',
  templateUrl: './blank-page-tpls.component.html',
  styleUrls: ['./blank-page-tpls.component.scss']
})
export class BlankPageTplsComponent implements OnInit {

  @Input() titleName: string;
  @Input() iconName: string;
  constructor() { }

  ngOnInit() {
  }

}
