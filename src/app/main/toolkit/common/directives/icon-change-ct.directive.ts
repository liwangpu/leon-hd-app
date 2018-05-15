import { Directive, HostListener, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChangeIconComponent } from '../components/uploader/change-icon/change-icon.component';
import { DialogService } from '../services/dialog.service';
import { FileAsset } from '../../models/fileasset';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appIconChangeCt]'
})
export class IconChangeCtDirective implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  @Input() uploadUrl: string;
  @Input() objId: string;
  @Input() iconUrl: string;
  @Output() afterUpload: EventEmitter<FileAsset> = new EventEmitter();
  @HostListener('click') onClick() {
    let dialog = this.dialogSrv.changeIConDialogSuit(ChangeIconComponent, '更换图标', this.uploadUrl, this.objId, this.iconUrl);
    let obs = dialog.componentInstance.afterUpload$.subscribe(resass => {
      this.afterUpload.next(resass);
    });
    dialog.afterClosed().first().subscribe(() => {
      obs.unsubscribe();
    });
  }
  constructor( private dialogSrv: DialogService) {

  }

  ngOnInit(): void {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
