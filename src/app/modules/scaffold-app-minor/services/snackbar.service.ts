import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SnackbarService {

  constructor(public snackBar: MatSnackBar, private tranSrv: TranslateService) { }

  simpleBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action ? action : '', {
      duration: duration ? duration : 2000,
    });
  }//simpleBar

  simpleTranslateBar(key: string, value?: any, action?: string, duration?: number) {
    this.tranSrv.get(key, value).subscribe(msg => {
      this.simpleBar(msg, action, duration);
    });
  }//simpleTranslateBar
}
