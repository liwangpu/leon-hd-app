import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';
import { OrderDetailListItemFormComponent } from '../order-detail-list-item-form/order-detail-list-item-form.component';
import { Order, OrderDetail, OrderService } from 'micro-dmz-oms';
import { AppConfigService } from '../../../../../app-config.service';
import { saveAs } from 'file-saver/FileSaver';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order-detail-list-editor',
  templateUrl: './order-detail-list-editor.component.html',
  styleUrls: ['./order-detail-list-editor.component.scss']
})
export class OrderDetailListEditorComponent implements OnInit, OnDestroy {

  currentOrderId: string;
  orderDetails: Array<OrderDetail> = [];
  constructor(protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected dialogSrv: DialogFactoryService, protected orderSrv: OrderService, protected appConfSrv: AppConfigService, protected httpClient: HttpClient) {

  }//constructor

  ngOnInit() {
    this.interactSrv.afterDataRefresh$.subscribe((data: Order) => {
      if (!data) return;
      this.currentOrderId = data.id;
      let tmpArr=data.orderDetails ? data.orderDetails : []

      this.orderDetails = tmpArr.sort(function (a, b) {
        var nameA = a.productBrand ? a.productBrand : '';
        var nameB = b.productBrand ? b.productBrand : '';
        if (nameA > nameB)
            return -1;
        if (nameA < nameB)
            return 1;
        return 0;
    });

    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

  editListItem(id: string) {
    let refItem = this.orderDetails.filter(x => x.id == id)[0];
    let dialogRef = this.dialogSrv.open(OrderDetailListItemFormComponent, {
      width: '650px',
      height: '500px',
      disableClose: true,
      data: {
        item: refItem
      }
    });
    dialogRef.componentInstance.afterDataRefresh.subscribe(form => {
      form['orderId'] = this.currentOrderId;
      let source$ = this.orderSrv.updateOrderDetail(form);
      this.asyncHandleSrv.asyncRequest(source$).subscribe((detail: OrderDetail) => {
        for (let idx = this.orderDetails.length - 1; idx >= 0; idx--) {
          let item = this.orderDetails[idx];
          if (item.id == form.id) {
            item.num = form.num;
            item.totalPrice = form.totalPrice;
            item.remark = form.remark;
            item.packages = detail.packages;
            break;
          }//if
        }
        dialogRef.close();
      });
    });//subscribe
    dialogRef.componentInstance.afterUploadFile.subscribe((arr: Array<any>) => {
      let fids = arr.map(x => x.id).join(',');
      refItem['orderId'] = this.currentOrderId;
      if (refItem.attachmentIds) {
        fids = refItem.attachmentIds + ',' + fids;
        fids = fids.replace(',,', ',');
      }
      refItem['attachIds'] = fids;
      let source$ = this.orderSrv.updateOrderDetail(refItem);
      this.asyncHandleSrv.asyncRequest(source$).subscribe((order: Order) => {
        for (let idx = this.orderDetails.length - 1; idx >= 0; idx--) {
          let item = this.orderDetails[idx];
          if (item.id == refItem.id) {
            if (refItem.attachmentIds) {
              for (let it of arr) {
                item.attachments.push(it);
              }
            }
            else {
              item.attachments = arr;
            }
            break;
          }//if
        }//for
        dialogRef.close();
      });
    });//subscribe
  }//editListItem

  deleteAttach(fid: string, detailId: string) {
    let refItem = this.orderDetails.filter(x => x.id == detailId)[0];
    let attachIds = refItem.attachments.map(x => x.id).join(',');
    attachIds = attachIds.replace(fid, ',');
    refItem['orderId'] = this.currentOrderId;
    refItem['attachIds'] = attachIds;
    let source$ = this.orderSrv.updateOrderDetail(refItem);
    this.asyncHandleSrv.asyncRequest(source$).subscribe((order: Order) => {
      for (let idx = this.orderDetails.length - 1; idx >= 0; idx--) {
        let item = this.orderDetails[idx];
        if (item.id == refItem.id) {
          item.attachments = item.attachments.filter(x => x.id != fid);
          break;
        }//if
      }//for
    });//subscribe
  }//deleteAttach

  exportList() {
    let serverUrl = encodeURIComponent(this.appConfSrv.appConfig.server);
    let url = `http://testtoolplus.damaozhu.com.cn/dmz/oms/order2excel?orderId=${this.currentOrderId}&server=${serverUrl}`;
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(fs => {
      saveAs(fs, 'Order Detail.xlsx');
    });
  }//exportList
}
