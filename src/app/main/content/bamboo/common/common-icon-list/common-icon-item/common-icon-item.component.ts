import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonIconItemDirective } from './common-icon-item.directive';

@Component({
  selector: 'app-common-icon-item',
  templateUrl: './common-icon-item.component.html',
  styleUrls: ['./common-icon-item.component.scss']
})
export class CommonIconItemComponent implements OnInit, AfterViewInit {

  @Input() fid: string;
  @Input() name: string;
  @Input() icon: string;
  @Input() itemWidth = 200;
  @Input() itemHeight = 150;
  @Output() selectedChange = new EventEmitter<{ id: string, seleted: boolean }>();
  @ViewChild(CommonIconItemDirective) item: CommonIconItemDirective;
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
