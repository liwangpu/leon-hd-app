import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map } from "../../../toolkit/models/map";
import { MapDetailMdService } from './map-detail-md.service';
import { Subject } from 'rxjs';
import { PathService } from '../../services/path.service';
@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.scss'],
  providers: [MapDetailMdService]
})
export class MapDetailComponent implements OnInit {

  map: Map = new Map();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, public detailMdSrv: MapDetailMdService, public pathSrv: PathService) {
    this.detailMdSrv.currentMap = this.route.snapshot.data.entity;

    this.detailMdSrv.afterMapChange$.takeUntil(this.destroy$).subscribe(() => {
      this.map = this.detailMdSrv.currentMap;
    });

    this.detailMdSrv.afterMapChange$.next();
  }//constructor

  ngOnInit() {
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
