import { Component, OnInit } from '@angular/core';
import { OrganService } from '../../share/services/webapis/organ.service';

@Component({
  selector: 'app-organ-detail',
  templateUrl: './organ-detail.component.html',
  styleUrls: ['./organ-detail.component.scss']
})
export class OrganDetailComponent implements OnInit {

  constructor(public apiSrv: OrganService) { }

  ngOnInit() {
  }

}
