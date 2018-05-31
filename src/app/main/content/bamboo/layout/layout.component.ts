import { Component, OnInit } from '@angular/core';
import { LayoutMdService } from './layout-md.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers:[LayoutMdService]
})
export class LayoutComponent implements OnInit {

  constructor(public mdSrv: LayoutMdService) { }

  ngOnInit() {
  }

}
