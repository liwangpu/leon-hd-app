import { Component, OnInit } from '@angular/core';
import { AreatypeMdService } from './areatype-md.service';

@Component({
  selector: 'app-area-type',
  templateUrl: './area-type.component.html',
  styleUrls: ['./area-type.component.scss'],
  providers: [AreatypeMdService]
})
export class AreaTypeComponent implements OnInit {

  constructor(public mdSrv: AreatypeMdService) { }

  ngOnInit() {
  }

}
