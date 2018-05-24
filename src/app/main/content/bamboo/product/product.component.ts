import { OnInit, Component, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { ProductMdService } from "./product-md.service";
import { fuseAnimations } from "../../../../core/animations";
import { Observable } from "rxjs/Observable";
import { DialogFactoryService } from "../../../toolkit/common/factory/dialog-factory.service";
import { SimpleCsvUploadComponent } from "../../../toolkit/common/factory/dialog-template/simple-csv-upload/simple-csv-upload.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: fuseAnimations,
  providers: [ProductMdService]
})
export class ProductComponent implements OnInit, OnDestroy {

  selectMode: boolean;
  hasSelectItems: boolean;
  @ViewChild('filter') filter: ElementRef;
  constructor(public mdSrv: ProductMdService, protected dialogFac: DialogFactoryService, protected tranSrv: TranslateService) {

    this.mdSrv.multipleSelect.subscribe(check => {
      this.hasSelectItems = check;
    });

    this.mdSrv.anyItemSelected.subscribe(hasItemSelected => {
      this.hasSelectItems = hasItemSelected;
    });
  }//constructor

  ngOnInit() {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe((vl) => {
        this.mdSrv.onSearch.next(this.filter.nativeElement.value);
      });
  }

  ngOnDestroy(): void {

  }//ngOnDestroy

  onSelect() {
    this.selectMode = !this.selectMode;
    this.mdSrv.onSelectMode.next(true);
  }//onSelectAll

  onUnSelect() {
    this.selectMode = !this.selectMode;
    this.mdSrv.onSelectMode.next(false);
  }//onUnSelect

  bulkChangeCategory() {
    this.mdSrv.changeCategoryItems.next();
  }//bulkChangeCategory


  bulkCategoryUpload() {
    let dialogTransAsync = () => {
      return new Promise((resolve) => {
        this.tranSrv.get('tips.UploadCategoryByCSV').subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//dialogTransAsync

    let showDialogAsync = (title) => {
      return new Promise((resolve) => {
        let dialog = this.dialogFac.simpleCsvUpload(title, { width: '450px', height: '550px', uploadUrl: 'products/ImportProductAndCategory', templateCsvUrl: 'products/ProductAndCategoryImportTemplate' });
        dialog.afterOpen().first().subscribe(() => {
          let ins = (dialog.componentInstance.componentIns as SimpleCsvUploadComponent);
          ins.doneAsync.subscribe((state) => {
            if (state) {
              this.mdSrv.onSearch.next(this.filter.nativeElement.value);
              ins.closeDialog.next();
            }
          });
        });
      });//promise
    };//showDialogAsync

    dialogTransAsync().then(showDialogAsync);

  }//bulkCategoryUpload
}
