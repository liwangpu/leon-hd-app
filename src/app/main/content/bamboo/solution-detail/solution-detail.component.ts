import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../../toolkit/server/webapi/solution.service';

@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {

  constructor(public solutionSrv:SolutionService) { }

  ngOnInit() {
  }

}
