import { Injectable } from '@angular/core';
import { OEvent } from '../models/oevent.model';
import { PenocApiService } from './penoc-api.service';
import { OEventResults } from '../models/oevent-results';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {

  constructor(private api: PenocApiService) { }

  public upcomingOEvents: OEvent[] | undefined;
  public nextOEvent: OEvent | undefined;
  public oEventResults: OEventResults[] = [];

  private oEventResultsFromDate: Date | undefined;
  private oEventResultsToDate: Date | undefined;
  private loadingMoreOEventResults: Boolean = false;

  public loadUpcomingOEvents() {
    this.api.getOEvents(undefined, undefined, new Date).subscribe(result => { this.upcomingOEvents = result });
  }

  public loadNextOEvent() {
    this.api.getOEvents(undefined, undefined, new Date()).subscribe(result => {
      if (result.length > 0) {
        this.nextOEvent = result[0];
      }
    })
  }

  public addMoreOEventResults(additionalOEvents: number) {
    if (this.loadingMoreOEventResults == false) {
      
      this.loadingMoreOEventResults = true;

      const oldCount = this.oEventResults.length;
      const targetCount = oldCount + additionalOEvents;

      if (this.oEventResults.length < targetCount) {
        //define the date range for the query as the 6 months prior to the current FromDate
        let toDate: Date = this.oEventResultsFromDate || new Date();
        toDate = new Date(toDate.setDate(toDate.getDate() - 1));

        let fromDate = new Date(toDate);
        fromDate = new Date(fromDate.setMonth(fromDate.getMonth() - 12));

        this.api.getOEventResultSummaries(undefined, undefined, fromDate, toDate, 1).subscribe((data) => {
          this.oEventResults = this.oEventResults.concat(data);
          let newCount = this.oEventResults.length;
          this.oEventResultsFromDate = fromDate;
          if (newCount > oldCount) {
            const outstandingEventCount = targetCount - this.oEventResults.length;
            this.addMoreOEventResults(outstandingEventCount);
          }
        });
      }

      this.loadingMoreOEventResults = false;

    }
  }
}

