import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { OrganizationTypeService, Organization } from 'micro-app-basic';

@Component({
  selector: 'app-organization-detail-basic-editor-ex',
  templateUrl: './organization-detail-basic-editor-ex.component.html',
  styleUrls: ['./organization-detail-basic-editor-ex.component.scss']
})
export class OrganizationDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  defaultOrganTypeId: string;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, public organTypeSrv: OrganizationTypeService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: []
      , organizationTypeId: ['', [Validators.required]]
      , location: ['', [Validators.maxLength(150)]]
      , activationTime: ['', [Validators.required]]
      , expireTime: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataRefershSubject$.subscribe((data:Organization) => {
      this.detailForm.patchValue(data);
      this.defaultOrganTypeId = data.organizationTypeId;
    });//
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  onOrganTypeSelected(item: any) {
    this.detailForm.patchValue({
      organizationTypeId: item.id
    });
  }//onOrganTypeSelected

  onOrganTypeClear() {
    this.detailForm.patchValue({
      organizationTypeId: ''
    });
  }//onOrganTypeClear

}
