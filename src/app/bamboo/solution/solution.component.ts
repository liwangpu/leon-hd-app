import { Component, OnInit } from '@angular/core';
import { SolutionPaginatorLaunchService } from './solution-paginator-launch.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  providers: [SolutionPaginatorLaunchService]
})
export class SolutionComponent implements OnInit {

  constructor(public launch: SolutionPaginatorLaunchService) { }

  // constructor() { }
  ngOnInit() {
  }

}
