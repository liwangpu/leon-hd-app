import { Component, OnInit } from '@angular/core';
import { PackageDetailMdService } from '../package-detail-md.service';
import { Subject } from 'rxjs';
import { distinct } from 'rxjs/operator/distinct';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-package-detail-group-detail-list',
  templateUrl: './group-detail-list.component.html',
  styleUrls: ['./group-detail-list.component.scss']
})
export class GroupDetailListComponent implements OnInit {

  destroy$ = new Subject<boolean>();
  constructor(public mdSrv: PackageDetailMdService) {

  }

  ngOnInit() {
    this.mdSrv.afterAreaSelected$.takeUntil(this.destroy$).pipe(distinctUntilChanged()).subscribe(id => this.onAreaChange(id));
  }//

  onAreaChange(id: string) {
    console.log('area', id);
  }//onAreaChange

}
