import { Injectable } from '@angular/core';
import { PaginatorLaunch, IAdvanceMenuItem } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { IListableService } from '../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../toolkit/models/ilistable';
import { SolutionService } from '../../../toolkit/server/webapi/solution.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class SolutionMdService extends PaginatorLaunch {

  createdUrl = 'app/solution-detail';
  titleIcon = 'shopping_basket';
  title = 'glossary.Solution';
  apiSrv: IListableService<Ilistable>;
  constructor(public solutionSrv: SolutionService, protected datePipe: DatePipe) {
    super(datePipe);
    this.apiSrv = this.solutionSrv;

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
