import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatFormField } from '@angular/material';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-mat-auto-select',
  templateUrl: './mat-auto-select.component.html',
  styleUrls: ['./mat-auto-select.component.scss']
})
export class MatAutoSelectComponent implements OnInit {

  private _usableSelectItems: Array<any> = [];
  fieldControl = new FormControl();
  @Output() selectChange = new EventEmitter<any>();
  @Output() inputChange = new EventEmitter<string>();
  @Output() inputClick = new EventEmitter();
  @Input() set defaultValue(val: string) {
    if (val)
      this.fieldControl.patchValue({ name: val });
  }
  @Input() fieldTitle = 'glossary.UserRole';
  @Input() required: boolean;
  @Input() set usableSelectItems(value: Array<any>) {
    this._usableSelectItems = value ? value : [];
  }
  get usableSelectItems(): Array<any> {
    return this._usableSelectItems;
  }
  @ViewChild('selectFCt') selectFCt: MatFormField;
  constructor() { }

  ngOnInit() {
    this.fieldControl.valueChanges.pipe(debounceTime(500)).subscribe(vl => {
      if (typeof vl != "string") return;
      this.inputChange.next(vl);
    });//subscribe

    // this.selectFCt.
  }//ngOnInit

  displayValueFn(data: any) {
    return data && data.name ? data.name : '';
  }//displayValueFn

  onSelectd(evt: MatAutocompleteSelectedEvent) {
    this.selectChange.next(evt.option.value);
  }//onSelectd

  onInputClick() {
    this.inputClick.next();
  }//onInputClick
}
