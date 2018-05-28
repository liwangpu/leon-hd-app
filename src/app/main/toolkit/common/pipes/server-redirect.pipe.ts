import { Pipe, PipeTransform } from '@angular/core';
import { PathService } from '../../../content/services/path.service';

@Pipe({
  name: 'serverRedirect'
})
export class ServerRedirectPipe implements PipeTransform {

  constructor(public pathSrv: PathService) {

  }//
  
  transform(value: any, args?: any): any {
    return this.pathSrv.redirectServerUrl(value);
  }

}
