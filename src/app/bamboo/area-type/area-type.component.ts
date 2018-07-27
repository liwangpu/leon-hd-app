import { Component, OnInit } from '@angular/core';
import { AreaTypePaginatorLaunchService } from './area-type-paginator-launch.service';

@Component({
  selector: 'app-area-type',
  templateUrl: './area-type.component.html',
  styleUrls: ['./area-type.component.scss'],
  providers: [AreaTypePaginatorLaunchService]
})
export class AreaTypeComponent implements OnInit {

  constructor(public launch: AreaTypePaginatorLaunchService) { }

  ngOnInit() {
  }

}
