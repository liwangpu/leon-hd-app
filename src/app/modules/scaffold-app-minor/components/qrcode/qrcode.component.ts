import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  @Input() size: number;
  @Input() content: string;
  qrcodeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/extensions/qrcode/qrcode.html');
  constructor(protected sanitizer: DomSanitizer) { }

  ngOnInit() {

  }//ngOnInit

}
