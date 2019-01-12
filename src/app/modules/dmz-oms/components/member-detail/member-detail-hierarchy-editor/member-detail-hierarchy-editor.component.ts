import { Component, OnInit } from '@angular/core';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from 'micro-dmz-oms';
import { AsyncHandleService } from 'scaffold-app-minor';

@Component({
  selector: 'app-member-detail-hierarchy-editor',
  templateUrl: './member-detail-hierarchy-editor.component.html',
  styleUrls: ['./member-detail-hierarchy-editor.component.scss']
})
export class MemberDetailHierarchyEditorComponent implements OnInit {

  satisfyCommit = false;
  defaultProvince: string;
  defaultCity: string;
  defaultCounty: string;
  detailForm: FormGroup;
  originData: any;
  constructor(protected interactSrv: DetailEditorInteractService, protected formBuilder: FormBuilder, protected memberSrv: MemberService, protected asyncHandle: AsyncHandleService) {

    this.detailForm = this.formBuilder.group({
      id: [],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      county: ['']
    });
  }//constructor

  ngOnInit() {

    this.detailForm.valueChanges.subscribe(() => {
      this.satisfyCommit = this.detailForm.valid;
    });

    this.interactSrv.afterDataRefresh$.subscribe(data => {
      if (!data) return;
      this.originData = data;
      this.detailForm.patchValue(data);
      this.defaultProvince = data.province;
      this.defaultCity = data.city;
      this.defaultCounty = data.county;
    });
  }//ngOnInit

  onUrbanChange(urban: { province: string, city: string, county: string }) {
    this.detailForm.patchValue(urban);
  }//onUrbanChange

  submit() {
    let form = this.detailForm.value;
    let data = { ...this.originData, ...form };
    let source$ = this.memberSrv.update(data);
    this.asyncHandle.asyncRequest(source$).subscribe();
  }//submit

}
