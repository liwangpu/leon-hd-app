// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-spec-nav-left-product',
//   templateUrl: './spec-nav-left-product.component.html',
//   styleUrls: ['./spec-nav-left-product.component.scss']
// })
// export class SpecNavLeftProductComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-spec-nav-left-product',
  templateUrl: './spec-nav-left-product.component.html',
  styleUrls: ['./spec-nav-left-product.component.scss']
})
export class SpecNavLeftProductComponent implements OnInit, OnDestroy {
  user: any;
  onFormChange: any;
  userForm: FormGroup;

  constructor(private chatService: ChatService) {
    this.user = this.chatService.user;
    this.userForm = new FormGroup({
      mood: new FormControl(this.user.mood),
      status: new FormControl(this.user.status)
    });
  }

  ngOnInit() {
    this.onFormChange = this.userForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(data => {
        this.user.mood = data.mood;
        this.user.status = data.status;
        this.chatService.updateUserData(this.user);
      });
  }

  changeLeftSidenavView(view) {
    this.chatService.onLeftSidenavViewChanged.next(view);
  }

  ngOnDestroy() {
    this.onFormChange.unsubscribe();
  }
}
