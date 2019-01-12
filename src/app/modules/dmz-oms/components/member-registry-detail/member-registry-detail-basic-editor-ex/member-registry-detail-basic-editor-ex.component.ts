import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-registry-detail-basic-editor-ex',
  templateUrl: './member-registry-detail-basic-editor-ex.component.html',
  styleUrls: ['./member-registry-detail-basic-editor-ex.component.scss']
})
export class MemberRegistryDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  defaultProvince: string;
  defaultCity: string;
  defaultCounty: string;
  showUrbanSelect = false;
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: [],
      mail: [''],
      phone: [''],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      county: ['']
    });

  }//constructor

  ngOnInit() {

    this.interactSrv.afterDataRefresh$.subscribe(data => {
      if (!data) return;
      this.defaultProvince = data.province;
      this.defaultCity = data.city;
      this.defaultCounty = data.county;
      this.showUrbanSelect = true;
    });
    super.ngOnInit();
    this.dataRefershSubject$.subscribe(data => {
      if (!data) return;
      this.detailForm.patchValue(data);
    });
  }//ngOnInit

  ngOnDestroy() {
    super.ngOnDestroy();
  }//ngOnDestroy

  onUrbanChange(urban: { province: string, city: string, county: string }) {
    this.detailForm.patchValue(urban);
  }//onUrbanChange

}
