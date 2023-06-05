import { Pipe, PipeTransform } from '@angular/core';
import { Competitor } from '../models/competitor';

@Pipe({
  name: 'sortCompetitorsIndividualsFirst'
})
export class SortCompetitorsIndividualsFirstPipe implements PipeTransform {

  transform(value: Array<Competitor>): Array<Competitor> {
console.log(value);
    if (value.length > 0) {
      let returnValue: number = 0;

      value.sort((competitorA, competitorB) => {
        competitorA.genderId = competitorA.genderId || 3;
        competitorB.genderId = competitorB.genderId || 3;

        if (competitorA.genderId != competitorB.genderId) {
          if (competitorA.genderId == 3) {
            return 1;
          }
          else if (competitorB.genderId == 3)
            return -1
        }
        if (competitorA.fullName > competitorB.fullName) {
          return 1;
        } else if (competitorB.fullName > competitorA.fullName) {
          return -1;
        } else {
          return 0
        }
      })
    }
    return value;
  }

}
