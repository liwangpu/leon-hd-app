import { Component, OnInit } from "@angular/core";
import { MaterialService } from "../../../toolkit/server/webapi/material.service";


@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss']
})
export class MaterialDetailComponent implements OnInit {


  constructor(public apiSrv: MaterialService) { }

  ngOnInit() {
  }

}
