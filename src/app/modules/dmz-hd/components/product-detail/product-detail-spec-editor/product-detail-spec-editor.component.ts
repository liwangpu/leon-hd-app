import { Component, OnInit } from '@angular/core';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { ProductSpec, Product, ProductSpecService } from 'micro-dmz-hd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncHandleService } from 'scaffold-app-minor';

@Component({
  selector: 'app-product-detail-spec-editor',
  templateUrl: './product-detail-spec-editor.component.html',
  styleUrls: ['./product-detail-spec-editor.component.scss']
})
export class ProductDetailSpecEditorComponent implements OnInit {

  currentProductId: string;
  currentSpecIcon: string;
  detailForm: FormGroup;
  specifications: Array<ProductSpec> = [];
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected productSpecSrv: ProductSpecService, protected asyncHandleSrv: AsyncHandleService) {
    this.detailForm = this.formBuilder.group({
      id: []
      , name: ['', [Validators.required]]
      , price: ['', [Validators.required]]
      , purchasePrice: ['', [Validators.required]]
      , partnerPrice: ['', [Validators.required]]
      , description: ['']
    });
  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((data: Product) => {
      if (!data) return;
      this.currentProductId = data.id;
      this.specifications = data.specifications ? data.specifications : [];
      if (this.specifications.length > 0)
        this.selectSpec(this.specifications[0].id);
    });//subscribe
  }//ngOnInit

  selectSpec(specId: string) {
    for (let idx = this.specifications.length - 1; idx >= 0; idx--) {
      let item = this.specifications[idx];
      if (item.id == specId)
        item['selected'] = true;
      else
        item['selected'] = false;
    }//for
    this.loadSpecMsg(specId);
  }//selectSpec

  loadSpecMsg(specId?: string) {
    if (!specId) {
      for (let idx = this.specifications.length - 1; idx >= 0; idx--) {
        let item = this.specifications[idx];
        item['selected'] = false;
      }//for
      this.detailForm.reset();
      this.currentSpecIcon = undefined;
      return;
    }
    let item = this.specifications.filter(x => x.id == specId)[0];
    this.currentSpecIcon = item.icon;
    this.detailForm.patchValue(item);
  }//loadSpecMsg

  addSpec() {
    this.loadSpecMsg();
  }//addSpec

  submit() {
    let form = this.detailForm.value;
    let orgSpec = this.specifications.filter(x => x.id == form.id)[0];
    let data = { ...orgSpec, ...form };
    data['productId'] = this.currentProductId;
    let source$ = this.productSpecSrv.update(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(res => {
      if (data.id) {
        for (let idx = this.specifications.length - 1; idx >= 0; idx--) {
          let item = this.specifications[idx];
          if (item.id == res.id) {
            this.specifications[idx] = res;
          }
        }//for
      }
      else {
        this.specifications.push(res)
      }
      this.selectSpec(res.id);
    });//subscribe
  }//submit

}
