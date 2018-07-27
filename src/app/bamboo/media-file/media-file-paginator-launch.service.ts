import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../../share/common/page-tpls/paginator-page-tpls/paginator-refers';
import { MediaFileService } from '../../share/services/webapis/media-file.service';
import { DatePipe } from '@angular/common';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';

@Injectable()
export class MediaFilePaginatorLaunchService extends PaginatorLaunch {

  createdUrl = 'app/share-detail';
  titleIcon = 'share';
  title = 'glossary.Share';
  constructor(public apiSrv: MediaFileService, protected datePipe: DatePipe, protected syncHandle: AsyncHandleService) {
    super(datePipe, syncHandle);
  }//constructor
}
