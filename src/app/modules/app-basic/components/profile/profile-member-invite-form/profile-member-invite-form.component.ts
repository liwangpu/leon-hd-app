import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { environment } from "@env/environment";
import { MatTooltip } from '@angular/material';
@Component({
  selector: 'app-profile-member-invite-form',
  templateUrl: './profile-member-invite-form.component.html',
  styleUrls: ['./profile-member-invite-form.component.scss']
})
export class ProfileMemberInviteFormComponent implements OnInit {

  satisfyConfirm = true;
  inviteUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  inviteOriginUrl: string;//用户资料填写原url
  @ViewChild('cpTooltip') cpTooltip: MatTooltip;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  afterReceiveData(data: { userId: string, username: string, avatar: string }) {

    let avater = data.avatar ? `${environment.serveBase}/${data.avatar}` : '';
    avater = avater.replace(/\/\//g, '/');
    avater = avater.replace('http:/', 'http://');
    avater = avater.replace('https:/', 'https://');
    this.inviteOriginUrl = `${environment.webtoolServer}/dmz/member/invite?s=${encodeURIComponent(environment.serveBase)}&u=${data.userId}&n=${data.username ? encodeURIComponent(data.username) : ''}&a=${encodeURIComponent(avater)}`;
  }//afterReceiveData

  copyQRCode() {
    this.cpTooltip.show();
    setTimeout(() => {
      this.cpTooltip.hide();
    }, 500);
  }//copyQRCode
}
