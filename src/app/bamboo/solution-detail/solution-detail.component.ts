import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../share/services/webapis/solution.service';

@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {

  constructor(public apiSrv: SolutionService) { }

  ngOnInit() {
  }

}
