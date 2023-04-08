import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Date | undefined,): string {
    if (value == undefined) {
      return '';
    } else {
      let fullDate: Date = new Date(value);
      let timeString = fullDate.getHours().toString() + ':' + fullDate.getMinutes().toString().padStart(2, '0') + ':' + fullDate.getSeconds().toString().padStart(2, '0');
      if (timeString == '0:00:00') {
        return '';
      }
      return timeString;
    }
  }

}
