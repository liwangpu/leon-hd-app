import { Injectable } from '@angular/core';
import { Map } from "../../../toolkit/models/map";
import { Subject } from 'rxjs';
@Injectable()
export class MapDetailMdService {

  currentMap: Map;//当前操作的Map
  afterMapChange$: Subject<void> = new Subject();//订单更新后触发事件
  destroy$: Subject<boolean> = new Subject();
  constructor() {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
