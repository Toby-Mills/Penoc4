import { Injectable } from '@angular/core';
import { OEvent } from '../models/oevent.model';
import { PenocApiService } from './penoc-api.service';
import { OEventResults } from '../models/oevent-results';
import { Observable, of, tap, map, BehaviorSubject } from 'rxjs';
import { Competitor } from '../models/competitor';
import { Venue } from '../models/venue';
import { Club } from '../models/club';
import { Difficulty } from '../models/difficulty';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {

  constructor(private api: PenocApiService) {
    this.allCompetitorsSubject.subscribe((competitors) => {
      this.updateCompetitorsSearchable();
    })
  }

  public upcomingOEvents: OEvent[] | undefined;
  public nextOEvent: OEvent | undefined;
  public oEventResultSummaries: OEventResults[] = [];

  private oEventResultsFromDate: Date | undefined;
  private loadingMoreOEventResults: Boolean = false;

  private oEventResults: OEventResults[] = [];
  private allCompetitorsSubject: BehaviorSubject<Competitor[]> = new BehaviorSubject<Competitor[]>([])
  private competitors: Competitor[] = [];
  private competitorsSearchable: CompetitorSearchable[] = [];
  private allCompetitorsLoaded: boolean = false;
  private venues: Venue[] = [];
  private venuesSubject: BehaviorSubject<Venue[]> = new BehaviorSubject<Venue[]>([])
  private clubs: Club[] = [];
  private clubsSubject: BehaviorSubject<Club[]> = new BehaviorSubject<Club[]>([])
  private difficulties: Difficulty[] = [];

  //---OEvents---
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

  //---OEventResults---
  getOEventResults(oEventId: number): Observable<OEventResults> {
    //look in the cache and return from there if found
    let oEventResults = this.oEventResults.filter(oEventResults => {
      if (oEventResults.oEvent) { return oEventResults.oEvent.id == oEventId }
      else { return false }
    })
    if (oEventResults.length == 1) {
      let theEvent = oEventResults[0]
      return of(theEvent)
    } else {
      //otherwise fetch from the api
      return this.api.getOEventResultSummary(oEventId)
        .pipe(
          tap(data => {
            this.oEventResults.push(data);
          })
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

  public getCompetitorResults(competitorId: number): Observable<Result[]> {
    return this.api.getCompetitorResults(competitorId);
  }

  //---Competitors---

  public getCompetitor(competitorId: number): Observable<Competitor> {
    //look in the cache and return from there if found
    let competitors = this.competitors.filter(competitor => competitor.id == competitorId)
    if (competitors.length == 1) {
      let theCompetitor = competitors[0]
      return of(theCompetitor)
    } else {
      //otherwise fetch from the api
      return this.api.getCompetitor(competitorId).pipe(
        tap(data => {
          if (data) { this.competitors.push(data) }
        })
      );
    }
  }

  private allCompetitors(): BehaviorSubject<Array<Competitor>> {
    if (!this.allCompetitorsLoaded) {
      this.api.searchCompetitors('').subscribe(
        (allCompetitors) => {
          this.competitors = allCompetitors;
          this.sortAllCompetitors();
          this.allCompetitorsLoaded = true;
          this.allCompetitorsSubject.next(this.competitors);
        })
    }
    return this.allCompetitorsSubject;
  }

  public addCompetitor(competitor: Competitor): Observable<Competitor> {
    return this.api.addCompetitor(competitor).pipe(
      tap(data => {
        this.competitors.push(data);
        this.sortAllCompetitors();
        this.allCompetitorsSubject.next(this.competitors);
      })
    )
  }

  public updateCompetitor(competitor: Competitor): Observable<Competitor> {
    return this.api.updateCompetitor(competitor).pipe(
      tap(competitor => {
        if (this.allCompetitorsLoaded) {
          for (let index = 0; index < this.competitors.length; index++) {
            if (this.competitors[index].id === competitor.id) {
              this.competitors[index] = competitor;
              this.allCompetitorsSubject.next(this.competitors)
              break; // Stop searching once the object is replaced
            }
          }
        }
      }
      )
    )
  }

  public deleteCompetitor(idCompetitor: number): Observable<any> {
    return this.api.deleteCompetitor(idCompetitor).pipe(
      tap(competitor => {
        this.competitors = this.competitors.filter(competitor => competitor.id != idCompetitor);
        this.allCompetitorsSubject.next(this.competitors);
      })
    )
  }

  public mergeCompetitors(idPrimaryCompetitor: number, idSecondarCompetitor: number): Observable<any>{
    return this.api.mergeCompetitors(idPrimaryCompetitor, idSecondarCompetitor).pipe(
      tap(result => {
        this.competitors = this.competitors.filter(competitor => competitor.id != idSecondarCompetitor);
        this.allCompetitorsSubject.next(this.competitors);
      })
    )
  }

  public searchAllCompetitors(searchText: string, individualsOnly: boolean = false): Observable<Competitor[]> {
    return this.allCompetitors().pipe(
      map(allCompetitors => {
        let results: Competitor[] = [];
        let searchTextStandardised: string = CompetitorSearchable.competitorSearchString(searchText);
        if (searchTextStandardised !== "") {
          let resultsSearchable = this.competitorsSearchable.filter((competitorSearchable) => {
            return competitorSearchable.searchString.includes(searchTextStandardised)
          })
          results = resultsSearchable.map(competitorSearchable => competitorSearchable.competitor)
        } else {
          results = [...this.competitors];
        }
        if (individualsOnly) { results = results.filter(competitor => { return competitor.genderId != 3 }) }
        return results;
      })
    );
  }

  private sortAllCompetitors() {
    this.competitors = this.competitors.sort((competitorA, competitorB) => {

      let nameA = competitorA.fullName.toLocaleLowerCase();
      let nameB = competitorB.fullName.toLocaleLowerCase();

      if (nameA > nameB) {
        return 1;
      } else if (nameA < nameB) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  private updateCompetitorsSearchable() {
    this.competitorsSearchable = [];

    for (let competitor of this.competitors) {
      const competitorSearchable: CompetitorSearchable = new CompetitorSearchable(competitor);
      this.competitorsSearchable.push(competitorSearchable);
    }
  }

  //---Venues---

  public getVenues(): BehaviorSubject<Venue[]> {
    //look in the cache and return from there if found
    if (this.venues.length == 0) {
      this.api.getVenues().subscribe(
        data => {
          this.venues = data;
          this.sortVenues();
          this.venuesSubject.next(this.venues);
        }
      );
    }
    return this.venuesSubject;
  }

  public updateVenue(venue: Venue): Observable<Venue> {
    return this.api.updateVenue(venue).pipe(
      tap(updatedVenue => {
        let index = this.venues.findIndex(venueA => venueA.id === venue.id);
        if (index > -1) {
          this.venues[index] = updatedVenue;
        }
        this.sortVenues();
        this.venuesSubject.next(this.venues);
      })
    );
  }

  public addVenue(venue:Venue): Observable<Venue>{
    return this.api.addVenue(venue).pipe(
      tap(addedVenue => {
        this.venues.push(addedVenue);
        this.sortVenues();
        this.venuesSubject.next(this.venues);
      }
    ))
  }

  public deleteVenue(venueId: number):Observable<Venue> {
    return this.api.deleteVenue(venueId).pipe(
      tap(deletedVenue => {
        this.venues = this.venues.filter(venueA => venueA.id != venueId);
        this.venuesSubject.next(this.venues);
      })
    )
  }

  private sortVenues():void{
    this.venues = this.venues.sort((venueA, venueB)=>{
      let nameA = venueA.name.toLocaleLowerCase();
      let nameB = venueB.name.toLocaleLowerCase();
      if(nameA > nameB){return 1}
      else if (nameB > nameA){return -1}
      else {return 0}
    })
  }

  //---Clubs---

  public getClubs(): Observable<Club[]> {
    if (this.clubs.length == 0) {
      this.api.getClubs().subscribe(
        data => {
          this.clubs = data;
          this.sortClubs();
          this.clubsSubject.next(this.clubs);
        }
      );
    }
    return this.clubsSubject;
  }

  public updateClub(club: Club): Observable<Club> {
    return this.api.updateClub(club).pipe(
      tap(updatedClub => {
        let index = this.clubs.findIndex(clubA => clubA.id === club.id);
        if (index > -1) {
          this.clubs[index] = updatedClub;
        }
        this.sortClubs();
        this.clubsSubject.next(this.clubs);
      })
    );
  }

  public addClub(club:Club): Observable<Club>{
    return this.api.addClub(club).pipe(
      tap(addedClub => {
        this.clubs.push(addedClub);
        this.sortClubs();
        this.clubsSubject.next(this.clubs);
      }
    ))
  }

  public deleteClub(clubId: number):Observable<Club> {
    return this.api.deleteClub(clubId).pipe(
      tap(deletedClub => {
        this.clubs = this.clubs.filter(clubA => clubA.id != clubId);
        this.clubsSubject.next(this.clubs);
      })
    )
  }

  private sortClubs():void{
    this.clubs = this.clubs.sort((clubA, clubB)=>{
      let nameA = clubA.shortName.toLocaleLowerCase();
      let nameB = clubB.shortName.toLocaleLowerCase();
      if(nameA > nameB){return 1}
      else if (nameB > nameA){return -1}
      else {return 0}
    })
  }

  //---Difficulties---

  public getDifficulties(): Observable<Difficulty[]> {
    //look in the cache and return from there if found
    if (this.difficulties.length > 0) { return of(this.difficulties) }
    else {
      //otherwise fetch from the api
      return this.api.getDifficulties().pipe(
        tap(data => this.difficulties = data)
      );
    }
  }
}

class CompetitorSearchable {
  public competitor: Competitor;
  public searchString: string = "";
  constructor(competitor: Competitor) {
    this.competitor = competitor
    this.searchString = CompetitorSearchable.competitorSearchString(this.competitor.fullName);
  }

  public static competitorSearchString(searchString: string) {
    let returnString: string = searchString;

    returnString = returnString.toLowerCase();
    returnString = returnString.trim();
    returnString = returnString.replace(/the/g, '');
    returnString = returnString.replace(/one/g, '1');
    returnString = returnString.replace(/two/g, '2');
    returnString = returnString.replace(/three/g, '3');
    returnString = returnString.replace(/four/g, '4');
    returnString = returnString.replace(/five/g, '5');
    returnString = returnString.replace(/\\|\"|\'|\(|\)|\!|\_|\*/g, '');
    returnString = returnString.replace(/group|grp|family|team/g, '*');
    returnString = returnString.replace(/and|\&|\+/g, '');
    returnString = returnString.replace(/ /g, '');

    return returnString;
  }
}