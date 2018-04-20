// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-spec-nav-left-specs',
//   templateUrl: './spec-nav-left-specs.component.html',
//   styleUrls: ['./spec-nav-left-specs.component.scss']
// })
// export class SpecNavLeftSpecsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';
import { ObservableMedia } from '@angular/flex-layout';
import { fuseAnimations } from '../../../../../../../core/animations';
import { FuseMatSidenavHelperService } from '../../../../../../../core/directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';

@Component({
  selector: 'app-spec-nav-left-specs',
  templateUrl: './spec-nav-left-specs.component.html',
  styleUrls: ['./spec-nav-left-specs.component.scss'],
  animations: fuseAnimations
})
export class SpecNavLeftSpecsComponent implements OnInit {
  user: any;
  chats: any[];
  contacts: any[];
  chatSearch: any;
  searchText = '';

  constructor(
    private chatService: ChatService,
    private fuseMatSidenavService: FuseMatSidenavHelperService,
    public media: ObservableMedia
  ) {
    this.chatSearch = {
      name: ''
    };
  }

  ngOnInit() {
    this.user = this.chatService.user;
    this.chats = this.chatService.chats;
    this.contacts = this.chatService.contacts;

    this.chatService.onChatsUpdated.subscribe(updatedChats => {
      this.chats = updatedChats;
    });

    this.chatService.onUserUpdated.subscribe(updatedUser => {
      this.user = updatedUser;
    });
  }

  getChat(contact) {
    this.chatService.getChat(contact);

    if (!this.media.isActive('gt-md')) {
      this.fuseMatSidenavService.getSidenav('chat-left-sidenav').toggle();
    }
  }

  setUserStatus(status) {
    this.chatService.setUserStatus(status);
  }

  changeLeftSidenavView(view) {
    this.chatService.onLeftSidenavViewChanged.next(view);
  }

  logout() {
    console.log('logout triggered');
  }
}
