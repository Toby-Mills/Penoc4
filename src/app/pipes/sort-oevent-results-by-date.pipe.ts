import { Pipe, PipeTransform } from '@angular/core';
import { OEventResults } from '../models/oevent-results';

@Pipe({
  name: 'sortOEventResultsByDate'
})
export class SortOEventResultsByDatePipe implements PipeTransform {

  transform(value: Array<OEventResults>): Array<OEventResults> {
    if (value && value.length > 0) {
      return value.sort(function (a, b) {
        if (a.oEvent && b.oEvent) {
          if (a.oEvent.date > b.oEvent.date) {
            return -1;
          } else if(a.oEvent.date == b.oEvent.date){
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
