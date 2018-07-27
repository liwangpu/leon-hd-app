import { Component, OnInit, Inject } from '@angular/core';
import { ISimpleConfirm } from '../simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-simple-message-content',
  templateUrl: './simple-message-content.component.html',
  styleUrls: ['./simple-message-content.component.scss']
})
export class SimpleMessageContentComponent implements OnInit, ISimpleConfirm {

  content: string;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private tranSrv: TranslateService) { }

  ngOnInit() {
    let transAsync = () => {
      return new Promise((resolve, reject) => {
        if (typeof (this.data.content) === 'string') {
          resolve(this.data.content);
        }
        else {
          this.tranSrv.get(this.data.content.key, this.data.content.value).subscribe(msg => {
            resolve(msg);
          });
        }
      });
    };//

    transAsync().then(msg => {
      this.content = msg as string;
    });
    setTimeout(() => {
      this.satisfyConfirm.next(true);
    }, 500);
  }//ngOnInit

}
