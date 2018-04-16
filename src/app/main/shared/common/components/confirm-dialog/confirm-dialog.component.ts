import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h3 mat-dialog-title>{{'tips.Prompt'|translate}}</h3>
  <mat-dialog-content>
   {{data.message}}
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)='_onConfirm()' mat-dialog-close>{{'button.Confirm'|translate}}</button>
    <button mat-button mat-dialog-close>{{'button.Cancel'|translate}}</button>
  </mat-dialog-actions>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {

  isConfirm: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  _onConfirm() {
    this.isConfirm = true;
  }

  ngOnInit() {

  }

}
