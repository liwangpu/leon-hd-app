import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DetailEditorInteractService implements OnDestroy {


  afterDataRefresh$ = new BehaviorSubject<any>(null);
  satisfyCommit$ = new BehaviorSubject<boolean>(true);
  basicExDataChange$ = new BehaviorSubject<any>(null);
  constructor() { }

  ngOnDestroy(): void {
    this.afterDataRefresh$.complete();
    this.afterDataRefresh$.unsubscribe();
    this.satisfyCommit$.complete();
    this.satisfyCommit$.unsubscribe();
  }//ngOnDestroy
}
