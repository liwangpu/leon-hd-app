import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-work-flow-detail-flow-item',
  templateUrl: './work-flow-detail-flow-item.component.html',
  styleUrls: ['./work-flow-detail-flow-item.component.scss']
})
export class WorkFlowDetailFlowItemComponent implements OnInit {

  @Input() flowId: string;
  @Input() flowName: string;
  @Input() subFlowId: string;
  @Output() editWorkFlowItem = new EventEmitter<string>();
  @Output() deleteWorkFlowItem = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editWorkFlowItem.next(this.flowId);
  }//onEdit

  onDelete() {
    this.deleteWorkFlowItem.next(this.flowId);
  }//onDelete

}
