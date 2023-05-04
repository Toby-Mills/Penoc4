import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '../models/result';

@Pipe({
  name: 'sortResultsByDate'
})
export class SortResultsByDatePipe implements PipeTransform {

  transform(value: Array<Result>): Array<Result> {
    if (value && value.length > 0) {
      return value.sort(function (a, b) {
        if (a.eventDate && b.eventDate) {
          if (a.eventDate > b.eventDate) {
            return -1
          } else if(a.eventDate == b.eventDate) {
            return 0
          } else {
            return 1
          }
        } else return 0;
      })
    }
    return value;
  }

}
