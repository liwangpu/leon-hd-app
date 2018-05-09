import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Solution } from '../../../toolkit/models/solution';
import { SolutionDetailMdService } from "./solution-detail-md.service";
@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit, OnDestroy {


  solutionName: string;
  showSubmitBtn: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private detailMdSrv: SolutionDetailMdService, private route: ActivatedRoute) {
    let tmp = this.route.snapshot.data.entity;
    this.detailMdSrv.solution = tmp ? tmp : new Solution();
    //订阅编辑变化事件
    this.detailMdSrv.onEdit$.takeUntil(this.destroy$).subscribe(() => {
      this.showSubmitBtn = true;
    });
    //订阅方案信息保存事件
    this.detailMdSrv.afterSaveSolution$.takeUntil(this.destroy$).subscribe(() => {
      this.solutionName = this.detailMdSrv.solution.name;
    });
  }

  ngOnInit() {
    this.solutionName = this.detailMdSrv.solution.name;
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  submit() {
    this.detailMdSrv.submitSolution$.next();
  }
}
