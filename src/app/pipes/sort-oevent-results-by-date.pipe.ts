import { Pipe, PipeTransform } from '@angular/core';
import { OEventResults } from '../models/oevent-results';

@Pipe({
  name: 'sortOEventResultsByDate'
})
export class SortOEventResultsByDatePipe implements PipeTransform {

  transform(value: Array<OEventResults>): Array<OEventResults> {
    if (value && value.length > 0) {
      return value.sort(function (a, b) {
        if (a.oEvent && a.oEvent.date && b.oEvent && b.oEvent.date) {
          let dateA = new Date(a.oEvent.date);
          let dateB = new Date(b.oEvent.date);
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
