import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Date | undefined,): string {
    if (value == undefined) {
      return '';
    } else {
      if (value instanceof Date) {
        let fullDate: Date = new Date(value);
        let timeString = fullDate.getUTCHours().toString() + ':' + fullDate.getUTCMinutes().toString().padStart(2, '0') + ':' + fullDate.getUTCSeconds().toString().padStart(2, '0');
        if (timeString == '0:00:00') {
          return '';
        }
        return timeString;
      } else { 
        throw new Error('Not a Date!!!') 
      }
    }
  }

}
