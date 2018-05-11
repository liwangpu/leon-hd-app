import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Material } from '../../../toolkit/models/material';
import { ActivatedRoute } from '@angular/router';
import { MaterialDetailMdService } from './material-detail-md.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss']
})
export class MaterialDetailComponent implements OnInit {

  materialName:string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private detailMdSrv: MaterialDetailMdService, private route: ActivatedRoute) {
    let tmp = this.route.snapshot.data.entity;
    this.detailMdSrv.currentMaterial = tmp ? tmp : new Material();

    //订阅方案信息保存事件
    this.detailMdSrv.afterEdit$.takeUntil(this.destroy$).subscribe(() => {
      this.materialName = this.detailMdSrv.currentMaterial.name;
    });
  }

  ngOnInit() {
    this.materialName = this.detailMdSrv.currentMaterial.name;
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
