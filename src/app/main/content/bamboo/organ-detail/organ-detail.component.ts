import { Component, OnInit } from '@angular/core';
import { Organization } from "../../../toolkit/models/organization";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';
import { ActivatedRoute } from "@angular/router";
import { OrganService } from "../../../toolkit/server/webapi/organ.service";
import { SnackbarService } from "../../../toolkit/common/services/snackbar.service";

@Component({
  selector: 'app-organ-detail',
  templateUrl: './organ-detail.component.html',
  styleUrls: ['./organ-detail.component.scss'],
  animations: fuseAnimations
})
export class OrganDetailComponent implements OnInit {
  organ: Organization;
  pageType = 'new';
  organForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private organSrv: OrganService, private snackbarSrv: SnackbarService) {
    this.organForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
    this.organ = this.route.snapshot.data.entity;
    if (this.organ && this.organ.id)
      this.organForm.patchValue(this.organ);
  }

  saveOrgan() {
    this.organSrv.update(this.organForm.value).subscribe(res => {
      console.log(111, 'aa', res);
      this.snackbarSrv.simpleBar('保存成功');
      this.organForm.patchValue(res);
    });
    // console.log(1211, this.organForm.value);
  }

}
