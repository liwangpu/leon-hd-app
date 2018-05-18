import { Component, OnInit } from '@angular/core';
import { Order } from '../../../toolkit/models/order';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PackageDetailMdService } from './package-detail-md.service';
import { Package } from '../../../toolkit/models/package';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
  providers: [PackageDetailMdService]
})
export class PackageDetailComponent implements OnInit {

  package: Package = new Package();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, public detailMdSrv: PackageDetailMdService, public pathSrv: PathService) {
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
