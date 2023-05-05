import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'UTCdate'
})
export class UTCDatePipe implements PipeTransform {
  readonly dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  readonly month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  transform(value: Date | string | undefined): string {
    const now = new Date();
    const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; //~six months in milliseconds
    if (value == undefined) {
      return '';
    } else {
      let fullDate: Date = new Date(value);
      let dateString = '';
      if (now.getTime() - fullDate.getTime() < sixMonths) {
        dateString += this.dayOfWeek[fullDate.getUTCDay()] + ', '
      }
      dateString += fullDate.getUTCDate().toString() + ' ' + this.month[fullDate.getUTCMonth()];
      if (now.getUTCFullYear() != fullDate.getUTCFullYear()) {
        dateString += " '" + fullDate.getUTCFullYear().toString().substring(2,4);
      }
      return dateString;
    }
  }
}
