import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailService } from "../../../product-detail.service";
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SnackbarService } from "../../../../../../toolkit/common/services/snackbar.service";
import { TranslateService } from '@ngx-translate/core';
import { ProductSpec } from "../../../../../../toolkit/models/productspec";
import { ProductSpecService } from "../../../../../../toolkit/server/webapi/productSpec.service";
@Component({
  selector: 'app-spec-nav-left-spec',
  templateUrl: './spec-nav-left-spec.component.html',
  styleUrls: ['./spec-nav-left-spec.component.scss']
})
export class SpecNavLeftSpecComponent implements OnInit, OnDestroy {

  productSpec: ProductSpec;
  productSpecForm: FormGroup;
  constructor(private detailService: ProductDetailService, private formBuilder: FormBuilder, private productSpecSrv: ProductSpecService, private snackBarSrv: SnackbarService, private transSrv: TranslateService) {
    // this.user = this.detailService.user;
    // this.userForm = new FormGroup({
    //   mood: new FormControl(this.user.mood),
    //   status: new FormControl(this.user.status)
    // });

    this.productSpec = this.detailService.currentEditSpec;
    this.productSpecForm = this.formBuilder.group({
      id: [''],
      productId: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
    // this.onFormChange = this.userForm.valueChanges
    //   .debounceTime(500)
    //   .distinctUntilChanged()
    //   .subscribe(data => {
    //     this.user.mood = data.mood;
    //     this.user.status = data.status;
    //     this.detailService.updateUserData(this.user);
    //   });
    // this.product = this.detailService.product;
    this.productSpecForm.patchValue(this.productSpec);
  }

  ngOnDestroy(): void {

  }

  onBackToSpecs(view) {
    this.detailService.onLeftSidenavViewChanged.next(view);
  }

  onSaveProductSpec() {
    let prodSpec = this.productSpecForm.value;

    let saveAsync = () => {
      return new Promise((resolve, reject) => {
        this.productSpecSrv.update(prodSpec).subscribe(rdata => {
          this.productSpecForm.patchValue(rdata);
          resolve(rdata);
        });
      });
    };//saveAsync

    let sucTransAsync = (data) => {
      return new Promise((resolve, reject) => {
        this.transSrv.get('message.SaveSuccessfully').subscribe(msg => {
          // this.snackBarSrv.simpleBar(msg);
          // this.detailService.afterProductSpecChange.next(data);
          // this.detailService.product = data;
          resolve(msg);
        });
      });
    };//sucTransAsync

    let errTransAsync = (data) => {
      return new Promise((resolve, reject) => {
        this.transSrv.get('message.SaveSuccessfully').subscribe(msg => {
          resolve(msg);
        });
      });
    };//errTransAsync

    saveAsync().then(sucTransAsync, errTransAsync).then((msg: string) => {
      this.snackBarSrv.simpleBar(msg);
    });
    // }//onSaveProduct

    // ngOnDestroy() {
    //   // this.onFormChange.unsubscribe();
  }
}
