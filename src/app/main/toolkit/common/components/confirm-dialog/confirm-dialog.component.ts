import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  isConfirm: boolean;
  @Output() onConfirm: EventEmitter<void> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  _onConfirm() {
    this.isConfirm = true;
    this.onConfirm.emit();
  }

  ngOnInit() {

  }

}
