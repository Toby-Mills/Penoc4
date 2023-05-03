import { Injectable } from '@angular/core';
import { OEvent } from '../models/oevent.model';
import { PenocApiService } from './penoc-api.service';
import { OEventResults } from '../models/oevent-results';
import { Observable, of, tap } from 'rxjs';
import { Competitor } from '../models/competitor';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {

  constructor(private api: PenocApiService) { }

  public upcomingOEvents: OEvent[] | undefined;
  public nextOEvent: OEvent | undefined;
  public oEventResultSummaries: OEventResults[] = [];

  private oEventResultsFromDate: Date | undefined;
  private oEventResultsToDate: Date | undefined;
  private loadingMoreOEventResults: Boolean = false;

  private oEventResults: OEventResults[] = [];
  private competitors: Competitor[] = [];

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

  getOEventResults(oEventId: number):Observable<OEventResults>{
    //look in the cache and return from there if found
    let oEventResults = this.oEventResults.filter(oEventResults => oEventResults.oEvent!.id == oEventId)
    if (oEventResults.length == 1){
      let theEvent = oEventResults[0]
      return of(theEvent)
    } else {
      //otherwise fetch from the api
      return this.api.getOEventResultSummary(oEventId).pipe(
        tap(data => this.oEventResults.push(data))
      );
    }
  }

  public addMoreOEventResultSummaries(additionalOEvents: number) {
    if (this.loadingMoreOEventResults == false) {
      
      this.loadingMoreOEventResults = true;

      const oldCount = this.oEventResultSummaries.length;
      const targetCount = oldCount + additionalOEvents;

      if (this.oEventResultSummaries.length < targetCount) {
        //define the date range for the query as the 6 months prior to the current FromDate
        let toDate: Date = this.oEventResultsFromDate || new Date();
        toDate = new Date(toDate.setDate(toDate.getDate() - 1));

        let fromDate = new Date(toDate);
        fromDate = new Date(fromDate.setMonth(fromDate.getMonth() - 12));

        this.api.getOEventResultSummaries(undefined, undefined, fromDate, toDate, 1).subscribe((data) => {
          this.oEventResultSummaries = this.oEventResultSummaries.concat(data);
          let newCount = this.oEventResultSummaries.length;
          this.oEventResultsFromDate = fromDate;
          if (newCount > oldCount) {
            const outstandingEventCount = targetCount - this.oEventResultSummaries.length;
            this.addMoreOEventResultSummaries(outstandingEventCount);
          }
        });
      }

      this.loadingMoreOEventResults = false;

    }
  }

  public getCompetitor(competitorId: number):Observable<Competitor>{
    //look in the cache and return from there if found
    let competitors = this.competitors.filter(competitor => competitor.id == competitorId)
    if (competitors.length == 1){
      let theCompetitor = competitors[0]
      return of(theCompetitor)
    } else {
      //otherwise fetch from the api
      return this.api.getCompetitor(competitorId).pipe(
        tap(data => {
          if(data){this.competitors.push(data)}
        })
      );
    }
  }
}
