import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, forkJoin } from 'rxjs';
import { FileService } from 'micro-app-basic';
import { OrderDetail } from 'micro-dmz-oms';

@Component({
  selector: 'app-order-detail-list-item-form',
  templateUrl: './order-detail-list-item-form.component.html',
  styleUrls: ['./order-detail-list-item-form.component.scss']
})
export class OrderDetailListItemFormComponent implements OnInit, OnDestroy {

  detailForm: FormGroup;
  totalPrice: string;
  totalPriceCt = new FormControl({ value: '', disabled: true });
  afterDataRefresh = new Subject<any>();
  afterUploadFile = new Subject<any>();
  @ViewChild('attachmentCt') attachmentCt: ElementRef;
  constructor(protected formBuilder: FormBuilder, protected fileSrv: FileService) {
    this.detailForm = this.formBuilder.group({
      id: []
      , productName: [{ value: '', disabled: true }]
      , productSpecName: [{ value: '', disabled: true }]
      , productUnit: [{ value: '', disabled: true }]
      , unitPrice: ['']
      , num: ['', [Validators.required]]
      , totalPrice: ['']
      , remark: ['']
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(vl => {
      let unitPrice = Number(vl.unitPrice);
      let num = Number(vl.num);
      this.totalPrice = (unitPrice * num).toFixed(0);
      this.totalPriceCt.patchValue(this.totalPrice);
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterDataRefresh.complete();
    this.afterDataRefresh.unsubscribe();
    this.afterUploadFile.complete();
    this.afterUploadFile.unsubscribe();
  }//ngOnDestroy

  afterConfirm() {
    let data = this.detailForm.value;
    data['totalPrice'] = this.totalPriceCt.value;
    this.afterDataRefresh.next(data);
  }//afterConfirm

  afterReceiveData(data: { item: OrderDetail }) {
    this.detailForm.patchValue(data.item);
  }//afterReceiveData

  addFile() {
    let el: HTMLElement = this.attachmentCt.nativeElement as HTMLElement;
    el.click();
  }//addFile

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let uploadSources = [];
      for (let idx = fileList.length - 1; idx >= 0; idx--) {
        let fitem = fileList[idx];
        let formData: FormData = new FormData();
        formData.append('file', fitem, fitem.name);
        let source = this.fileSrv.uploadFormFile(formData, fitem.name, fitem.name);
        uploadSources.push(source);
      }//for

      forkJoin(...uploadSources).subscribe(res => {
        this.afterUploadFile.next(res);
      }, err => {
        this.afterUploadFile.error(err);
      });//subscribe
    }
  }//fileChange
}
