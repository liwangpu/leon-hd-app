import { Component, OnInit, Input, ViewChild, TemplateRef, ContentChild, AfterContentInit, forwardRef } from '@angular/core';
import { DetailEditScheduleService } from '../detail-edit-schedule.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Ilistable } from '../../../../../toolkit/models/ilistable';
import { ListableBase } from '../../../../../toolkit/models/listablebase';
import { DetailTabBaseExtend } from '../detail-edit-tpls.component';


export abstract class CustomTabBaseExtend {
  isBasic: boolean;
  dataChange$: BehaviorSubject<Ilistable> = new BehaviorSubject(new ListableBase());
  destroy$: Subject<boolean> = new Subject();
}


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
  constructor(public scheduleSrv: DetailEditScheduleService) {
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
