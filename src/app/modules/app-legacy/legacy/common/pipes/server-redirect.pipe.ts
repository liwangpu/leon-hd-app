import { Pipe, PipeTransform } from '@angular/core';
import { PathService } from '../../services/common/path.service';

@Pipe({
  name: 'serverRedirect'
})
export class ServerRedirectPipe implements PipeTransform {

  constructor(private pathSrv: PathService) {

  }

  transform(value: any, args?: any): any {
    if (value && args) {
      let fname = value.substring(0, value.lastIndexOf('.'));
      let extension = value.substring(value.lastIndexOf('.'), (value as string).length);
      return this.pathSrv.redirectServerUrl(`${fname}_${args}${extension}`);
    }
    return this.pathSrv.redirectServerUrl(value);
  }

}
