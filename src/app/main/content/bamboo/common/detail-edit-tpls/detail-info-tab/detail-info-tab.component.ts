import { Component, OnInit, Input, ViewChild, TemplateRef, ContentChild, AfterContentInit } from '@angular/core';
import { DetailEditScheduleService } from '../detail-edit-schedule.service';

export abstract class DetailTabBaseExtend {

}

@Component({
  selector: 'app-detail-info-tab',
  templateUrl: './detail-info-tab.component.html',
  styleUrls: ['./detail-info-tab.component.scss']
})
export class DetailInfoTabComponent implements OnInit, AfterContentInit {

  @Input() isBasic = false;
  @Input() tabName = 'glossary.BasicInfo';
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @ContentChild(DetailTabBaseExtend) ext: DetailTabBaseExtend;
  constructor(public scheduleSrv: DetailEditScheduleService) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {

  }

}
