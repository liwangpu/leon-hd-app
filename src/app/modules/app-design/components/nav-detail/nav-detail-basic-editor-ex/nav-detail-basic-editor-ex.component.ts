import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { Navigation } from '@geek/micro-app-basic';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-nav-detail-basic-editor-ex',
  templateUrl: './nav-detail-basic-editor-ex.component.html',
  styleUrls: ['./nav-detail-basic-editor-ex.component.scss']
})
export class NavDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: []
      , resource: ['']
      , title: ['']
      , icon: ['']
      , field: ['']
      , url: ['']
      , pagedModel: ['']
      , permission: ['']
      , nodeType: ['']
      , queryParams: ['']
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataRefershSubject$.subscribe((data: Navigation) => {
      this.detailForm.patchValue(data);
    });//
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  onNodeTypeChange(evt: MatRadioChange) {

  }//onNodeTypeChange

}
