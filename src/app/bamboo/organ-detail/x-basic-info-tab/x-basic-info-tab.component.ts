import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicInfoTabExtend } from '../../../share/common/page-tpls/detail-page-tpls/detail-edit-refers';
import { Organization } from '../../../share/models/organization';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-organ-detail-x-basic-info-tab',
  templateUrl: './x-basic-info-tab.component.html',
  styleUrls: ['./x-basic-info-tab.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => XBasicInfoTabComponent) }]
})
export class XBasicInfoTabComponent extends BasicInfoTabExtend implements OnInit, OnDestroy {

  organTypes = [
    ['brand', 'glossary.OrganBrand']
    , ['partner', 'glossary.OrganPartner']
    , ['supplier', 'glossary.OrganSupplier']
  ];
  organType = '';
  detailForm: FormGroup;
  data: { type: string, mail: string } = { type: '', mail: '' };
  constructor(private formBuilder: FormBuilder) {
    super();

    this.afterDataChange$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      let organ = (data as Organization);
      this.data.type = organ.type;
      this.data.mail = organ.mail;
      if (this.detailForm)
        this.detailForm.patchValue({ type: organ.type, mail: organ.mail });
    });

    this.detailForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      mail: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.canSave = true;
    this.detailForm.valueChanges.subscribe(val => {
      this.data.type = val.type;
      this.data.mail = val.mail;
      this.canSave = Boolean(val.mail);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
