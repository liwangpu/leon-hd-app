import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Solution } from '../../../toolkit/models/solution';
import { SolutionDetailMdService } from "./solution-detail-md.service";
@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {

  private solutionName: string;
  private showSubmitBtn: boolean;
  private detroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private detailMdSrv: SolutionDetailMdService, private route: ActivatedRoute) {
    let tmp = this.route.snapshot.data.entity;
    this.detailMdSrv.solution = tmp ? tmp : new Solution();
    //订阅编辑变化事件
    this.detailMdSrv.onEdit$.takeUntil(this.detroy$).subscribe(() => {
      this.showSubmitBtn = true;
    });
    //订阅方案信息保存事件
    this.detailMdSrv.afterSaveSolution$.takeUntil(this.detroy$).subscribe(() => {
      this.solutionName = this.detailMdSrv.solution.name;
    });
  }

  ngOnInit() {
    this.solutionName = this.detailMdSrv.solution.name;
  }

  submit() {
    this.detailMdSrv.submitSolution$.next();
  }
}
