// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-product-detail-spec-charlets',
//   templateUrl: './spec-charlets.component.html',
//   styleUrls: ['./spec-charlets.component.scss']
// })
// export class SpecCharletsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ProductDetailService } from '../product-detail.service';
import { NgForm } from '@angular/forms';
import { FusePerfectScrollbarDirective } from '../../../../../core/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

@Component({
  selector: 'app-product-detail-spec-charlets',
  templateUrl: './spec-charlets.component.html',
  styleUrls: ['./spec-charlets.component.scss']
})
export class SpecCharletsComponent implements OnInit, AfterViewInit {
  user: any;
  chat: any;
  dialog: any;
  contact: any;
  replyInput: any;
  selectedChat: any;
  @ViewChild(FusePerfectScrollbarDirective) directiveScroll: FusePerfectScrollbarDirective;
  // @ViewChildren('replyInput') replyInputField;
  // @ViewChild('replyForm') replyForm: NgForm;

  constructor(private productDetailService: ProductDetailService) {
  }

  ngOnInit() {
    this.user = this.productDetailService.user;
    this.productDetailService.onChatSelected
      .subscribe(chatData => {
        if (chatData) {
          this.selectedChat = chatData;
          this.contact = chatData.contact;
          this.dialog = chatData.dialog;
          this.readyToReply();
        }
      });
  }

  ngAfterViewInit() {
    // this.replyInput = this.replyInputField.first.nativeElement;
    // this.readyToReply();
  }

  selectContact() {
    this.productDetailService.selectContact(this.contact);
  }

  readyToReply() {
    setTimeout(() => {
      // this.replyForm.reset();
      this.focusReplyInput();
      this.scrollToBottom();
    });

  }

  focusReplyInput() {
    setTimeout(() => {
      this.replyInput.focus();
    });
  }

  scrollToBottom(speed?: number) {
    speed = speed || 400;
    if (this.directiveScroll) {
      this.directiveScroll.update();

      setTimeout(() => {
        this.directiveScroll.scrollToBottom(0, speed);
      });
    }
  }

  reply(event) { 
    // // Message
    // const message = {
    //   who: this.user.id,
    //   message: this.replyForm.form.value.message,
    //   time: new Date().toISOString()
    // };

    // // Add the message to the chat
    // this.dialog.push(message);

    // // Update the server
    // this.productDetailService.updateDialog(this.selectedChat.chatId, this.dialog).then(response => {
    //   this.readyToReply();
    // });

  }
}
