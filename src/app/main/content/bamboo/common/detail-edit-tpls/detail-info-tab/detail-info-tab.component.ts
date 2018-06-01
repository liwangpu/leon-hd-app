import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-detail-info-tab',
  templateUrl: './detail-info-tab.component.html',
  styleUrls: ['./detail-info-tab.component.scss']
})
export class DetailInfoTabComponent implements OnInit {

  @Input() isBasic = false;
  @Input() tabName='glossary.BasicInfo';
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

}
