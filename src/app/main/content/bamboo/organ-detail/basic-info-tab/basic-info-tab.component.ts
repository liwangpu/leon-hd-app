import { Component, OnInit, forwardRef, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { BasicInfoTabExtend } from '../../common/detail-edit-tpls/basic-info-tab/basic-info-tab.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization } from '../../../../toolkit/models/organization';

@Component({
  selector: 'app-organ-detail-basic-info-tab',
  templateUrl: './basic-info-tab.component.html',
  styleUrls: ['./basic-info-tab.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => BasicInfoTabComponent) }]
})
export class BasicInfoTabComponent extends BasicInfoTabExtend implements OnInit, OnDestroy, OnChanges {

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

    this.afterDataChange$.takeUntil(this.destroy$).subscribe(data => {
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

  ngOnChanges(changes: SimpleChanges): void {

  }//ngOnChanges

}
