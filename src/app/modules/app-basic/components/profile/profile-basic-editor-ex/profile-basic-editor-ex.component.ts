import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from '@geek/scaffold-page-plate';

@Component({
  selector: 'app-profile-basic-editor-ex',
  templateUrl: './profile-basic-editor-ex.component.html',
  styleUrls: ['./profile-basic-editor-ex.component.scss']
})
export class ProfileBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: [],
      isAdmin: [],
      mail: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.maxLength(50)]],
      location: ['', [Validators.maxLength(200)]],
      department: [{ value: '', disabled: true }]
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
