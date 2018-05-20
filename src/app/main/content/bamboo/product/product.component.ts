import { OnInit, Component, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { ProductMdService } from "./product-md.service";
import { fuseAnimations } from "../../../../core/animations";
import { Observable } from "rxjs/Observable";

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
  constructor(public mdSrv: ProductMdService) {

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
}
