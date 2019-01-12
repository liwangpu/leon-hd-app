import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';


@Component({
  selector: 'app-order-detail-basic-editor-ex',
  templateUrl: './order-detail-basic-editor-ex.component.html',
  styleUrls: ['./order-detail-basic-editor-ex.component.scss']
})
export class OrderDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      workFlowItemId: [''],
      workFlowItemName: ['']
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataRefershSubject$.subscribe(data => {
      this.detailForm.patchValue(data);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit


}

