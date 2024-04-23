import { Pipe, PipeTransform } from '@angular/core';
import { OEvent } from '../models/oevent.model';

@Pipe({
  name: 'sortOeventsByDate'
})
export class SortOeventsByDatePipe implements PipeTransform {

  transform(value:OEvent[], order: 'asc' | 'desc' = 'asc'): OEvent[] {
    if (value && value.length > 0) {
      return value.sort(function (a, b) {
        let result = 0;
        if (a.date && b.date) {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          if (dateA > dateB) {
            result = 1;
          } else if(dateA < dateB){
            result = -1;
          }
        } else result = 0;
        if (order == 'desc'){
          result *= -1;
        }
        return result;
      })
    }
    return value;
  }

}
