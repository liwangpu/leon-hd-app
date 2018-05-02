import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecsCardComponent } from "../specs-card/specs-card.component";
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { ProductDetailMdService, EditPointer } from "../product-detail-md.service";
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductSpecService } from "../../../../toolkit/server/webapi/productSpec.service";
import { MatDialog, MatDialogRef } from '@angular/material';
import { SpecUploadComponent } from "../spec-upload/spec-upload.component";
@Component({
  selector: 'app-product-detail-spec-form',
  templateUrl: './spec-form.component.html',
  styleUrls: ['./spec-form.component.scss']
})
export class SpecFormComponent implements OnInit, OnDestroy {
  private showUploadBtn: boolean;
  private specForm: FormGroup;
  private dialogRef: any;
  private destroy$: Subject<boolean> = new Subject();
  constructor(private detailMdSrv: ProductDetailMdService, private formBuilder: FormBuilder, private snackBarSrv: SnackbarService, private tranSrv: TranslateService, private productSpecSrv: ProductSpecService, private dialog: MatDialog) {
    this.specForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      productId: ['']
    });

    this.detailMdSrv.afterSelectProductSpec$.takeUntil(this.destroy$).subscribe(() => {
      this.onSelectSpec();
    });
    this.detailMdSrv.submitProductSpec$.takeUntil(this.destroy$).subscribe(() => {
      this.submitProductSpec();
    });
  }

  ngOnInit() {
    this.specForm.patchValue(this.detailMdSrv.productSpec);
    //value change事件发布
    this.specForm.valueChanges.takeUntil(this.destroy$).debounceTime(150).subscribe(data => {
      if (this.specForm.valid) {
        this.detailMdSrv.onEdit$.next();
        this.detailMdSrv.currentEditPointer = EditPointer.ProductSpec;
      }
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  private onSelectSpec() {
    if (!this.detailMdSrv.productSpec.id) {
      this.specForm.reset();
      this.showUploadBtn = false;
    }
    else {
      this.showUploadBtn = true;
    }
    this.specForm.patchValue(this.detailMdSrv.productSpec);
  }//onSelectSpec

  private submitProductSpec() {
    let saveProdSpecAsync = () => {
      return new Promise((resolve) => {
        this.productSpecSrv.update(this.specForm.value).subscribe(resProd => {
          this.detailMdSrv.productSpec.id = resProd.id;
          this.detailMdSrv.productSpec.name = resProd.name;
          this.detailMdSrv.productSpec.description = resProd.description;
          this.showUploadBtn = true;
          this.detailMdSrv.afterSaveProductSpec$.next();
          this.specForm.patchValue(this.detailMdSrv.productSpec);
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          resolve({ k: 'message.OperationError', v: { value: err } });
        });
      });//promise
    };//saveProdSpecAsync

    let transAsync = (mobj: { k: string, v: any }) => {
      return new Promise((resolve) => {
        this.tranSrv.get(mobj.k, mobj.v).subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    saveProdSpecAsync().then(transAsync).then(msg => {
      this.snackBarSrv.simpleBar(msg as string);
    });
    // console.log(111, 'form', this.specForm.value);
  }//submitProductSpec

  onUpload() {
    let ndialog = this.dialog.open(SpecUploadComponent, {
      width: '400px',
      height: '600px',
      data: { productSpecId: this.detailMdSrv.productSpec.id }
    });

    ndialog.afterClosed().first().subscribe(() => {
      if (ndialog.componentInstance.isCharletChange)
        this.detailMdSrv.afterProductCharletChange$.next(true);
    });
  }//onUpload
}
