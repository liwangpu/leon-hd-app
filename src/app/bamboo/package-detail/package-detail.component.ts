import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../share/services/webapis/package.service';
import { PackageDetailMdService } from './package-detail-md.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
  providers:[PackageDetailMdService]
})
export class PackageDetailComponent implements OnInit {

  constructor(public apiSrv: PackageService) { }

  ngOnInit() {
  }

}
