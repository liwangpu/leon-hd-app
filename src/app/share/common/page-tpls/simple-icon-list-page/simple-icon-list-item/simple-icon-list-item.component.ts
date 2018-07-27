import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SimpleIconListItemDirective } from './simple-icon-list-item.directive';

@Component({
  selector: 'app-simple-icon-list-item',
  templateUrl: './simple-icon-list-item.component.html',
  styleUrls: ['./simple-icon-list-item.component.scss']
})
export class SimpleIconListItemComponent implements OnInit, AfterViewInit {

  selected = false;
  iconUrl: string;
  @Input() fid: string;
  @Input() name: string;
  @Input() icon: string;
  @Input() itemWidth = 200;
  @Input() itemHeight = 150;
  @Output() selectedChange = new EventEmitter<{ id: string, seleted: boolean }>();
  @ViewChild(SimpleIconListItemDirective) item: SimpleIconListItemDirective;
  constructor() { }

  get imgStyle() {
    return {
      width: (this.itemWidth - 2) + 'px',
      height: (this.itemHeight - 1 - 16 - 10) + 'px'
    };
  }

  ngOnInit() {
  }//ngOnInit

  ngAfterViewInit(): void {

  }//ngAfterViewInit

  _selectedChange(seleted: boolean) {
    this.selectedChange.next({ id: this.fid, seleted: seleted });
  }//selectedChange

  clearSelect() {
    this.item.clearSelected();
  }//clearSelect

}
