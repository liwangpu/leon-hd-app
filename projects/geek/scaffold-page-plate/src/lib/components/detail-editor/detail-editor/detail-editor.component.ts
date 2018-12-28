import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DetailEditorInteractService } from '../../../services/detail-editor-interact.service';

@Component({
  selector: 'page-plate-detail-editor',
  templateUrl: './detail-editor.component.html',
  styleUrls: ['./detail-editor.component.scss']
})
export class DetailEditorComponent implements OnInit, OnDestroy {

  _entityPersist = false;
  @Input() name: string;
  @Input() title: string;
  @Input() avatar: string;
  @Input() tabFirstTitle = 'glossary.BasicInfo';
  @Input() tabSecondTitle: string;
  @Input() tabThirdTitle: string;
  @Input() tabFourthTitle: string;
  @Input() tabFifthTitle: string;
  @Input() tabFirst: TemplateRef<any>;
  @Input() tabSecond: TemplateRef<any>;
  @Input() tabThird: TemplateRef<any>;
  @Input() tabFourth: TemplateRef<any>;
  @Input() tabFifth: TemplateRef<any>;
  @Input() hideGoBack = false;
  @Output() goback = new EventEmitter<void>();
  destroy$ = new Subject<boolean>();
  constructor(protected interactSrv: DetailEditorInteractService) {

  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!data) return;
      this._entityPersist = data && data.id ? true : false;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onGoBack() {
    this.goback.next();
  }//onGoBack

}
