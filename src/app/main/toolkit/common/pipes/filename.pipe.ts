import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && value.toString().lastIndexOf('.') !== -1) {
      return value.substring(0, value.lastIndexOf('.'));
    }
    return '';
  }

}
