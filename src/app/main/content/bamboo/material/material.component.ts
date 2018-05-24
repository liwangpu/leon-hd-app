import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Material } from '../../../toolkit/models/material';
import { MaterialService } from '../../../toolkit/server/webapi/material.service';
import { PaginatorStore } from '../../../toolkit/common/classes/paginator-store';
import { MatSort, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';
import { fuseAnimations } from '../../../../core/animations';
import { PathService } from '../../services/path.service';
import { MaterialMdService } from './material-md.service';
import { Observable } from 'rxjs/Observable';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleCsvUploadComponent } from '../../../toolkit/common/factory/dialog-template/simple-csv-upload/simple-csv-upload.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  animations: fuseAnimations,
  providers: [MaterialMdService]
})
export class MaterialComponent implements OnInit, OnDestroy {
  selectMode: boolean;
  hasSelectItems: boolean;
  @ViewChild('filter') filter: ElementRef;
  constructor(public mdSrv: MaterialMdService, protected dialogFac: DialogFactoryService, protected tranSrv: TranslateService) {

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

  bulkCategoryUpload(){
    let dialogTransAsync = () => {
      return new Promise((resolve) => {
        this.tranSrv.get('tips.UploadCategoryByCSV').subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//dialogTransAsync

    let showDialogAsync = (title) => {
      return new Promise((resolve) => {
        let dialog = this.dialogFac.simpleCsvUpload(title, { width: '450px', height: '550px', uploadUrl: 'material/ImportMaterialAndCategory', templateCsvUrl: 'material/MaterialAndCategoryImportTemplate' });
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
