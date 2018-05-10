import { Component, OnInit } from '@angular/core';
import { Order } from '../../../toolkit/models/order';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PackageDetailMdService } from './package-detail-md.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {

  package: Order = new Order();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private detailMdSrv: PackageDetailMdService) {
    this.detailMdSrv.currentPackage = this.route.snapshot.data.entity;

    this.detailMdSrv.afterPackageChange$.takeUntil(this.destroy$).subscribe(() => {
      this.package = this.detailMdSrv.currentPackage;
    });

    this.detailMdSrv.afterPackageChange$.next();
  }//constructor

  ngOnInit() {
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
