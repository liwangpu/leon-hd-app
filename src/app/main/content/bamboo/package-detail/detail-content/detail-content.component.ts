import { Component, OnInit } from '@angular/core';
import { PackageContent } from "../../../../toolkit/models/package-content";
import { PackageContentItem } from "../../../../toolkit/models/package-content-item";
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-package-detail-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss']
})
export class DetailContentComponent implements OnInit {

  displayedColumns = ['productName', 'productSpecName', 'unitPrice', 'num', 'totalPrice'];
  dataSource: MatTableDataSource<PackageContentItem>;
  packageContent: PackageContent;
  constructor() {

  }

  ngOnInit() {
    // this.packageContent = this.detaiMdSrv.currentPackage.contentIns ? this.detaiMdSrv.currentPackage.contentIns : new PackageContent();
    // let items = this.packageContent.items ? this.packageContent.items : [];
    // this.dataSource = new MatTableDataSource(items);
  }//ngOnInit

}
