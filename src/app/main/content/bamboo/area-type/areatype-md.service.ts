import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { AreaTypeService } from '../../../toolkit/server/webapi/area-type.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class AreatypeMdService extends PaginatorLaunch {

    createdUrl = 'app/area-type-detail';
    titleIcon = 'chrome_reader_mode';
    title = 'glossary.AreaType';
    constructor(public apiSrv: AreaTypeService, protected datePipe: DatePipe) {
        super(datePipe);
    }//constructor

}
