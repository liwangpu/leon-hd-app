import { Component, OnInit } from "@angular/core";
import { PackageService } from "../../../toolkit/server/webapi/package.service";

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {

  constructor(public apiSrv: PackageService) {

  }//constructor

  ngOnInit() {
  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy
}
