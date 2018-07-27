import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProductLeftCategoryLaunchService } from '../../product/product-left-category-launch.service';
import { IQueryFilter } from '../../../share/common/interfaces/iqueryFilter';
import { ISimpleConfirm } from '../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { XSimplePaginatorLaunchService } from './x-simple-paginator-launch.service';

@Component({
  selector: 'app-product-replace-group-x-edit-form',
  templateUrl: './x-edit-form.component.html',
  styleUrls: ['./x-edit-form.component.scss'],
  providers: [ProductLeftCategoryLaunchService, XSimplePaginatorLaunchService]
})
export class XEditFormComponent implements OnInit, ISimpleConfirm, AfterContentInit {

  @ViewChild('stepper', {
    read: MatHorizontalStepper
  }) stepper: MatHorizontalStepper;
  data: any;
  groupInfoForm: FormGroup;
  selectGroupItemsForm: FormGroup;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(private formBuilder: FormBuilder, public leftProductCategoryMdSrv: ProductLeftCategoryLaunchService, public productListMdSrv: XSimplePaginatorLaunchService) {
    this.groupInfoForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });

    this.selectGroupItemsForm = this.formBuilder.group({
      itemIds: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
  }

  ngAfterContentInit(): void {

  }



  onSelectProductCategory(catId: string) {
    let advFilters: Array<IQueryFilter> = [
      { field: 'categoryId', value: catId }
    ];
    this.productListMdSrv.query({}, advFilters);
  }//onSelectProductCategory

  onSelectProducts(idArr: Array<string>) {
    if (idArr.length <= 0) {
      this.satisfyConfirm.next(false);
      return;
    }

    this.selectGroupItemsForm.patchValue({ itemIds: idArr.join(',') });
    let basicInfoObj = this.groupInfoForm.value;
    let itemIdsObj = this.selectGroupItemsForm.value;
    this.data = { ...basicInfoObj, ...itemIdsObj };
    this.satisfyConfirm.next(true);
  }//onSelectProducts

}
