import { Component, OnInit} from '@angular/core';
import { SolutionMdService } from './solution-md.service';
import { fuseAnimations } from '../../../../core/animations';
@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  animations: fuseAnimations,
  providers: [
    SolutionMdService
  ]
})
export class SolutionComponent implements OnInit {
  constructor(public mdSrv: SolutionMdService) {
  }//constructor

  ngOnInit() {

  }//ngOnInit
}
