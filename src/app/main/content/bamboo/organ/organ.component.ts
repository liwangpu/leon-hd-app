import { Component, OnInit } from "@angular/core";
import { OrganMdService } from "./organ-md.service";

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  providers: [
    OrganMdService
  ]
})
export class OrganComponent implements OnInit {

  readDataOnly = true;
  constructor(public mdSrv: OrganMdService) {
  }

  ngOnInit() {

  }//ngOnInit


}
