import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { MatTooltip } from '@angular/material';
import { AppConfigService } from '../../../../../app-config.service';
@Component({
  selector: 'app-profile-member-invite-form',
  templateUrl: './profile-member-invite-form.component.html',
  styleUrls: ['./profile-member-invite-form.component.scss']
})
export class ProfileMemberInviteFormComponent implements OnInit {

  satisfyConfirm = true;
  inviteUrl: string;
  @ViewChild('cpTooltip') cpTooltip: MatTooltip;
  constructor(public sanitizer: DomSanitizer, protected appConfigSrv: AppConfigService) { }

  ngOnInit() {
  }

  afterReceiveData(data: { userId: string, username: string, avatar: string }) {
    this.inviteUrl = `${this.appConfigSrv.appConfig.toolServer}/dmz-oms/member-invite?u=${data.userId}`;
  }//afterReceiveData

  copyQRCode() {
    this.cpTooltip.show();
    setTimeout(() => {
      this.cpTooltip.hide();
    }, 500);
  }//copyQRCode
}
