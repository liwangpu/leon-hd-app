import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-plate-simple-confirm-message-dialog',
  templateUrl: './simple-confirm-message-dialog.component.html',
  styleUrls: ['./simple-confirm-message-dialog.component.scss']
})
export class SimpleConfirmMessageDialogComponent implements OnInit, OnDestroy {

  enableConfirm = false;
  message: string;
  afterConfirm$ = new Subject();
  constructor(private tranSrv: TranslateService) {

  }//constructor

  ngOnInit(): void {
    this.enableConfirm = true;
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterConfirm$.complete();
    this.afterConfirm$.unsubscribe();
  }//ngOnDestroy

  afterConfirm() {
    this.afterConfirm$.next();
  }//afterConfirm

  afterReceiveData(data: { message: string, param: any }) {
    if (data && data.message) {
      this.tranSrv.get(data.message, data.param ? { value: data.param } : undefined).subscribe(msg => {
        this.message = msg;
      });
    }//if
  }//afterReceiveData

}
