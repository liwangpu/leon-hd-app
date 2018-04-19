import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss']
})
export class DepartmentCardComponent implements OnInit {

  user: any;
  filterBy: string;
  onUserDataChangedSubscription: Subscription;
  constructor() { }

  ngOnInit() {
  }

}
