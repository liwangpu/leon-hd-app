import { Pipe, PipeTransform } from '@angular/core';
import { Navigation } from 'micro-app-basic';



@Pipe({
  name: 'navFilter'
})
export class NavFilterPipe implements PipeTransform {

  transform(navs: Array<Navigation>, nodeType?: string, parentId?: string): any {
    if (nodeType) {
      let typeArr = nodeType.split(',');
      let tmpArr = [];
      if (parentId)
        tmpArr = navs.filter(x => typeArr.some(y => y == x.nodeType) && x.parentId == parentId);
      else
        tmpArr = navs.filter(x => typeArr.some(y => y == x.nodeType));
      return tmpArr.sort(function (a: Navigation, b: Navigation) {
        if (a.grade < b.grade)
          return -1;
        if (a.grade > b.grade)
          return 1;
        return 0;
      });
    }
    return navs;
  }//transform

}
