import { Injectable } from '@angular/core';
import { Solution } from "../../../toolkit/models/solution";
import { Subject } from "rxjs/Subject";
@Injectable()
export class SolutionDetailMdService {
  solution: Solution;
  onEdit$: Subject<void> = new Subject();
  afterSaveSolution$: Subject<void> = new Subject();
  submitSolution$: Subject<void> = new Subject();
  constructor() { }

}
