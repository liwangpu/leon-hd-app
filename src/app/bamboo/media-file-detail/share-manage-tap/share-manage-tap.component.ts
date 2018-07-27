import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { CustomTabBaseExtend } from '../../../share/common/page-tpls/detail-page-tpls/detail-edit-refers';
import { MediaShareResource } from '../../../share/models/media-share-resource';
import { takeUntil } from 'rxjs/operators';
import { MediaFile } from '../../../share/models/media-file';

@Component({
  selector: 'app-media-file-share-manage-tap',
  templateUrl: './share-manage-tap.component.html',
  styleUrls: ['./share-manage-tap.component.scss'],
  providers: [{ provide: CustomTabBaseExtend, useExisting: forwardRef(() => ShareManageTapComponent) }]
})
export class ShareManageTapComponent extends CustomTabBaseExtend implements OnInit, OnDestroy {

  mediaType: string;
  mediaId: string;
  shares: Array<MediaShareResource> = [];
  constructor() {
    super();

  }

  ngOnInit() {
    this.dataChange$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.mediaId = data.id;
      this.mediaType = (data as MediaFile).type;
      this.shares = (data as MediaFile).mediaShares ? (data as MediaFile).mediaShares : [];
    });
  }//

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addShare() {
    let newItemExist = this.shares.some(x => !x.id);
    if (newItemExist) return;
    this.shares.unshift(new MediaShareResource());
  }//addShare

  deleteShare(id: string) {
    this.shares = this.shares.filter(x => x.id != id);
  }//deleteShare

  saveShare(data: MediaShareResource) {
    for (let idx = this.shares.length - 1; idx >= 0; idx--) {
      let curItem = this.shares[idx];
      if (!curItem.id) {
        this.shares[idx] = data;
        break;
      }
    }
  }//saveShare
}
