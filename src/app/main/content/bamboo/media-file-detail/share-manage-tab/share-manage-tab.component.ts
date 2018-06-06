import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { MediaShareResource } from '../../../../toolkit/models/media-share-resource';
import { MediaFile } from '../../../../toolkit/models/media-file';
import { CustomTabBaseExtend } from '../../common/detail-edit-tpls/detail-info-tab/detail-info-tab.component';


@Component({
  selector: 'app-media-file-share-manage-tab',
  templateUrl: './share-manage-tab.component.html',
  styleUrls: ['./share-manage-tab.component.scss'],
  providers: [{ provide: CustomTabBaseExtend, useExisting: forwardRef(() => ShareManageTabComponent) }]
})
export class ShareManageTabComponent extends CustomTabBaseExtend implements OnInit, OnDestroy {

  mediaId: string;
  shares: Array<MediaShareResource> = [];
  constructor() {
    super();

  }

  ngOnInit() {
    this.dataChange$.takeUntil(this.destroy$).subscribe(data => {
      this.mediaId = data.id;
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
