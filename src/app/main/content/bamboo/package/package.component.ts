import { Component, OnInit } from "@angular/core";
import { PackageMdService } from "./package-md.service";


@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  providers: [PackageMdService]
})
export class PackageComponent implements OnInit {

  constructor(public mdSrv: PackageMdService) {


  }

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {

  }//ngOnDestroy

}
