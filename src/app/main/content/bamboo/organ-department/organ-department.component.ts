import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// import { ContactsService } from './contacts.service';
import { fuseAnimations } from '../../../../core/animations';
import { FormControl, FormGroup } from '@angular/forms';
// import { FuseContactsContactFormDialogComponent } from './contact-form/contact-form.component';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-organ-department',
  templateUrl: './organ-department.component.html',
  styleUrls: ['./organ-department.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class OrganDepartmentComponent implements OnInit {

  hasSelectedContacts: boolean;
  searchInput: FormControl;
  dialogRef: any;
  onSelectedContactsChangedSubscription: Subscription;
  showFiller = true;
  constructor() { }

  ngOnInit() {
  }

  onEditAdmin() {
    alert(1);
  }
}
