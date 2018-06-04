import { Injectable } from '@angular/core';
import { PaginatorLaunch } from '../common/paginator-common-tpls/paginator-common-tpls.component';
import { SolutionService } from '../../../toolkit/server/webapi/solution.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class SolutionMdService extends PaginatorLaunch {

  createdUrl = 'app/solution-detail';
  titleIcon = 'shopping_basket';
  title = 'glossary.Solution';
  constructor(public apiSrv: SolutionService, protected datePipe: DatePipe) {
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
