import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorCommonMdService } from '../../../paginator-common-md.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-litimg-icon-item',
  templateUrl: './litimg-icon-item.component.html',
  styleUrls: ['./litimg-icon-item.component.scss']
})
export class LitimgIconItemComponent implements OnInit, OnDestroy {

  @Input() Id: string;
  @Input() Name: string;
  @Input() Description: string;
  @Input() Icon: string;
  @Input() SelectMode: boolean;
  @Input() Selected: boolean;
  @Input() LinkPath: string;
  @Output() OnCheckChange: EventEmitter<boolean> = new EventEmitter();
  destroy$: Subject<boolean> = new Subject();
  constructor(private router: Router, public mdSrv: PaginatorCommonMdService) {

    this.mdSrv.allSelect$.takeUntil(this.destroy$).subscribe(checked => {
      this.Selected = checked;
    });//
  }//constructor

  ngOnInit(): void {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  onClick() {
    if (this.SelectMode) {
      this.Selected = !this.Selected;
      this.OnCheckChange.next(this.Selected);
    }
    else {
      this.router.navigate([this.LinkPath, this.Id]);
    }
  }//onClick

  selectedChange(checked: boolean) {
    this.Selected = checked;
    this.OnCheckChange.next(checked);
  }//selectedChange
}
