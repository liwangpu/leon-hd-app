import { CommonCategoryService } from "../../../services/webapis/common-category.service";
import { Subject } from "rxjs";

export abstract class CommonCategoryTplsBase {
  apiSrv: CommonCategoryService;
  constructor() { }
}

export abstract class CategoryNavExtend {
  abstract categoryName: string;
  afterCategorySelected$ = new Subject<string>();
}
