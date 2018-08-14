import { Component, OnInit } from '@angular/core';
import { LayoutPaginatorLaunchService } from './layout-paginator-launch.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [LayoutPaginatorLaunchService]
})
export class LayoutComponent implements OnInit {

  constructor(public launch: LayoutPaginatorLaunchService) { }

  ngOnInit() {
  }

}
