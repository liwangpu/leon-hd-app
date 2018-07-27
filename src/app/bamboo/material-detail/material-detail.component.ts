import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../share/services/webapis/material.service';

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
