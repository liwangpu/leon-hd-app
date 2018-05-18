import { Component, ElementRef, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Solution } from "../../../toolkit/models/solution";
import { SolutionService } from "../../../toolkit/server/webapi/solution.service";
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
import { DataSource } from '@angular/cdk/collections';
import { AccountDetailComponent } from "../account/account-detail/account-detail.component";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Account } from "../../../toolkit/models/account";
import { AccountTypeEnums } from "../../../toolkit/enums/enums";
import { PathService } from '../../services/path.service';
@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  animations: fuseAnimations
})
export class SolutionComponent implements OnInit {
  displayedColumns = ['icon', 'name', 'description', 'createdTime'];
  dataSource: PaginatorStore<Solution>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;
  dialogRef: any;
  constructor(private solutionSrv: SolutionService, public dialog: MatDialog, public pathSrv: PathService) {
  }

  ngOnInit() {
    this.dataSource = new PaginatorStore<Solution>({ service: this.solutionSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort })

  }

  onEditAdmin(organId: string) {
    // this.solutionSrv.getById(organId).subscribe(resAccount => {

    //   let owner = resAccount.owner ? resAccount.owner : new Account();
    //   if (!owner.id)
    //     owner.name = '组织管理员';
    //   owner.organizationId = organId;
    //   owner.type = AccountTypeEnums.organization;

    //   this.dialogRef = this.dialog.open(AccountDetailComponent, {
    //     panelClass: 'contact-form-dialog',
    //     data: {
    //       account: owner
    //     }
    //   });
    // });

  }//onEditAdmin

}
