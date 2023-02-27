import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  readonly dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  readonly month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  transform(value: Date | undefined): string {
    const now = new Date();
    const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; //~six months in milliseconds
    if (value == undefined) {
      return '';
    } else {
      let fullDate: Date = new Date(value);
      let dateString = '';
      if (now.getTime() - fullDate.getTime() < sixMonths) {
        dateString += this.dayOfWeek[fullDate.getDay()] + ', '
      }
      dateString += fullDate.getDate().toString() + ' ' + this.month[fullDate.getMonth()];
      if (now.getFullYear() != fullDate.getFullYear()) {
        dateString += " '" + fullDate.getFullYear().toString().substring(2,4);
      }
      return dateString;
    }
  }
}


