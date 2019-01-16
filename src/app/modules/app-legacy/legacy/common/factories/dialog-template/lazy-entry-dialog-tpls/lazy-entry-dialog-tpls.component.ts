import { Component, OnInit, Inject, Injector, ViewContainerRef, ViewChild, ReflectiveInjector, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { ISimpleConfirm } from '../simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lazy-entry-dialog-tpls',
  templateUrl: './lazy-entry-dialog-tpls.component.html',
  styleUrls: ['./lazy-entry-dialog-tpls.component.scss']
})
export class LazyEntryDialogTplsComponent implements OnInit, OnDestroy, ISimpleConfirm {

  lazyEntryIns: any;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  destroy$ = new Subject<boolean>();
  @ViewChild('lazyEntryContainer', { read: ViewContainerRef }) lazyEntryContainer: ViewContainerRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private injector: Injector) { }

  ngOnInit() {
    let resolverInject = ReflectiveInjector.resolveAndCreate([{ provide: this.data.component, useValue: this.data.component }], this.injector);
    const childComponent = this.data.componentFactoryResolver.resolveComponentFactory(this.data.component);
    let ins = this.lazyEntryContainer.createComponent(childComponent, 0, resolverInject).instance as ISimpleConfirm;
    (ins as any).data = this.data;
    //接收订阅并转移
    ins.satisfyConfirm.pipe(takeUntil(this.destroy$)).subscribe((vl) => {
      this.satisfyConfirm.next(vl);
    });
    this.afterConfirm.subscribe(() => {
      ins.afterConfirm.next();
    });
    this.afterCancel.subscribe(() => {
      ins.afterCancel.next();
    });
    ins.closeDialog.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.closeDialog.next();
    });
    ins.doneAsync.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.doneAsync.next();
    });
    this.lazyEntryIns = ins;
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
