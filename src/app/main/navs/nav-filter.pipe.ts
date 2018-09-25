import { Pipe, PipeTransform } from '@angular/core';
import { Navigation } from '../../share/models/navigation';

@Pipe({
  name: 'navFilter'
})
export class NavFilterPipe implements PipeTransform {

  transform(navs: Array<Navigation>, nodeType?: string, parentId?: string): any {
    if (nodeType) {
      let typeArr = nodeType.split(',');
      if (parentId)
        return navs.filter(x => typeArr.some(y => y == x.nodeType) && x.parentId == parentId);
      return navs.filter(x => typeArr.some(y => y == x.nodeType));
    }
    return navs;
  }//transform

}
