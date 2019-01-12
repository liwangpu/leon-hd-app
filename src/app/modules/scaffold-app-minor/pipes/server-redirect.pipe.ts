import { Pipe, PipeTransform } from '@angular/core';
import { Path } from 'scaffold-app-core';

@Pipe({
  name: 'serverRedirect'
})
export class ServerRedirectPipe implements PipeTransform {

  constructor() { }

  transform(value: any, args?: any): any {
    if (value && args) {
      let fname = value.substring(0, value.lastIndexOf('.'));
      let extension = value.substring(value.lastIndexOf('.'), (value as string).length);
      return Path.redirectServerUrl(`${fname}_${args}${extension}`);
    }
    return Path.redirectServerUrl(value);
  }

}
