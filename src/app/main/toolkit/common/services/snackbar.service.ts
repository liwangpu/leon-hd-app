import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  simpleBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action ? action : '', {
      duration: duration ? duration : 2000,
    });
  }

}
