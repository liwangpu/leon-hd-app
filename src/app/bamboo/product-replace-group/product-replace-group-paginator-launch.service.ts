import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { ProductReplaceGroupService } from '../../share/services/webapis/product-replace-group.service';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { DatePipe } from '@angular/common';
import { PaginatorLaunch, ListDisplayModeEnum } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';
import { XEditFormComponent } from './x-edit-form/x-edit-form.component';


@Injectable()
export class ProductReplaceGroupPaginatorLaunchService extends PaginatorLaunch {

    createdUrl = '';
    titleIcon = 'linear_scale';
    title = 'glossary.ProductReplaceGroup';
    enableDisplayModes = [ListDisplayModeEnum.ProductReplaceGroup];
    displayMode = ListDisplayModeEnum.ProductReplaceGroup;
    constructor(public apiSrv: ProductReplaceGroupService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService, protected dialogFac: DialogFactoryService, protected componentFactoryResolver: ComponentFactoryResolver) {
        super(datePipe, syncHandle,dialogFac);
    }//constructor

    createdAction: { icon?: string, title?: string, onClick: Function } = {
        onClick: () => { this.createReplaceGroup() }
    };

    createReplaceGroup() {
        let dialog = this.dialogFac.lazyModelEntryConfirm(XEditFormComponent, this.componentFactoryResolver, 'dialog.CreateProductReplaceGroup', { width: '900px', height: '700px' });

        dialog.afterOpen().subscribe(() => {
            let ins: XEditFormComponent = dialog.componentInstance.componentIns.lazyEntryIns;
            ins.afterConfirm.subscribe(() => {
                let source$ = this.apiSrv.create(ins.data);
                this.syncHandle.asyncRequest(source$).subscribe(() => {
                    // console.log(1111, ins.data);
                    this.refreshData$.next();
                    ins.doneAsync.next();
                    ins.closeDialog.next();
                }, err => {
                    ins.doneAsync.next();
                });
            });//afterConfirm


        });//afterOpen
    }//createReplaceGroup
}
