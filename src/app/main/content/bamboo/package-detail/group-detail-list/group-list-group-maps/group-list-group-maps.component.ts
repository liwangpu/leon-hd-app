import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-detail-group-list-group-maps',
  templateUrl: './group-list-group-maps.component.html',
  styleUrls: ['./group-list-group-maps.component.scss']
})
export class GroupListGroupMapsComponent implements OnInit {

  arr = [];
  constructor() {

    for (let idx = 0; idx < 30; idx++) {
      this.arr.push(idx);
    }//for
    
  }//constructor

  ngOnInit() {
  }

}
