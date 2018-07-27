import { Component, OnInit } from '@angular/core';
import { OrganPaginatorLaunchService } from './organ-paginator-launch.service';

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  providers: [OrganPaginatorLaunchService]
})
export class OrganComponent implements OnInit {

  constructor(public launch: OrganPaginatorLaunchService) {

  }

  ngOnInit() {
  }

}
