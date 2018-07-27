import { Directive, HostListener, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
// import { ChangeIconComponent } from '../components/uploader/change-icon/change-icon.component';
import { FileAsset } from '../../models/fileasset';
import { Subject } from 'rxjs';
import { DialogFactoryService } from '../factories/dialog-factory.service';
import { ChangeIconComponent } from '../components/change-icon/change-icon.component';

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
    let dialog = this.dialogSrv.tplsConfirm(ChangeIconComponent, 'dialog.ChangeIcon', {
      width: '460px', height: '542px', hideCancelBtn: true, data: {
        uploadUrl: this.uploadUrl,
        objId: this.objId,
        iconUrl: this.iconUrl
      }
    });

    dialog.afterOpen().subscribe(() => {
      let ins: ChangeIconComponent = dialog.componentInstance.componentIns;
      ins.afterUploadIcon.subscribe((fs: FileAsset) => {
        this.afterUpload.next(fs);
      });
    });//afterOpen
  }//onClick

  constructor(private dialogSrv: DialogFactoryService) {

  }//constructor


  ngOnInit(): void {

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy
}
