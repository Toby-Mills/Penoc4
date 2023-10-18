import { Pipe, PipeTransform } from '@angular/core';
import { OEvent } from '../models/oevent.model';

@Pipe({
  name: 'sortOeventsByDate'
})
export class SortOeventsByDatePipe implements PipeTransform {

  transform(value:OEvent[]): OEvent[] {
    if (value && value.length > 0) {
      return value.sort(function (a, b) {
        if (a.date &&b.date) {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          if (dateA > dateB) {
            return -1;
          } else if(dateA == dateB){
            return 0
          } else {
            return 1;
          }
        } else return 0;
      })
    }
    return value;
  }

}
