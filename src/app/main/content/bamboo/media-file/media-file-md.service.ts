import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { MediaFileService } from '../../../toolkit/server/webapi/media-file.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class MediaFileMdService extends PaginatorLaunch {

  createdUrl = 'app/share-detail';
  titleIcon = 'share';
  title = 'glossary.Share';
  constructor(public apiSrv: MediaFileService, protected datePipe: DatePipe) {
    super(datePipe);

    // let aa = 6;
    // let testItem: IAdvanceMenuItem = {
    //   icon: 'clear',
    //   name: 'button.Export',
    //   needSelected: true,
    //   click: () => {
    //     alert(aa);
    //   }
    // };

    // this.advanceMenuItems.push(testItem);
  }//constructor

}