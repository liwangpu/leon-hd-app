import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AccountMdService {

  selectedDepartment: string;//当前选中部门
  afterDepartmentChange:Subject<string>=new Subject();
  constructor() { 
    
  }

}
