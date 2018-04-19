import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ContactsService } from '../../contacts.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-organ-o-admin',
  templateUrl: './o-admin.component.html',
  styleUrls: ['./o-admin.component.scss']
})
export class OAdminComponent implements OnInit {

  user: any;
  filterBy: string;
  onUserDataChangedSubscription: Subscription;
  constructor() { }

  ngOnInit() {
  }

}
