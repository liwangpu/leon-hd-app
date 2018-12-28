import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorCommonMdService } from '../../../paginator-common-md.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

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
  @Output() OnCheckChange = new EventEmitter<boolean>();
  destroy$ = new Subject<boolean>();
  constructor(private router: Router, public mdSrv: PaginatorCommonMdService) {

    this.mdSrv.allSelect$.pipe(takeUntil(this.destroy$)).subscribe(checked => {
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