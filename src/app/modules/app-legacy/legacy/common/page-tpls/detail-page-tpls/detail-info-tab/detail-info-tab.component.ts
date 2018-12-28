import { Component, OnInit, Input, TemplateRef, ViewChild, ContentChild, AfterContentInit, forwardRef } from '@angular/core';
import { CustomTabBaseExtend, DetailTabBaseExtend } from '../detail-edit-refers';
import { DetailEditMdService } from '../detail-edit-md.service';

@Component({
  selector: 'app-detail-info-tab',
  templateUrl: './detail-info-tab.component.html',
  styleUrls: ['./detail-info-tab.component.scss'],
  providers: [{ provide: DetailTabBaseExtend, useExisting: forwardRef(() => DetailInfoTabComponent) }]
})
export class DetailInfoTabComponent extends DetailTabBaseExtend implements OnInit, AfterContentInit {

  @Input() isBasic = false;
  @Input() tabName = 'glossary.BasicInfo';
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @ContentChild(CustomTabBaseExtend) ext: CustomTabBaseExtend;
  constructor(public scheduleSrv: DetailEditMdService) {
    super();

    this.dataChange$.subscribe(data => {
      if (this.ext)
        this.ext.dataChange$.next(data);
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {


  }

}
