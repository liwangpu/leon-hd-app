import { Component, OnInit } from '@angular/core';
import { PackagePaginatorLaunchService } from './package-paginator-launch.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  providers:[PackagePaginatorLaunchService]
})
export class PackageComponent implements OnInit {

  constructor(public launch: PackagePaginatorLaunchService) { }

  ngOnInit() {
  }

}
