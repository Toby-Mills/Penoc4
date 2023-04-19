import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OEvent } from '../models/oevent.model';
import { OEventResults } from '../models/oevent-results';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Competitor } from '../models/competitor';

@Injectable({
  providedIn: 'root'
})
export class PenocApiService {
  apiKey: string = 'Orienteering';
  baseUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  private addRequestHeaders(options?: any) {
    options = options || {};
    let headers: HttpHeaders = options.headers || new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('API_KEY', this.apiKey);
    options.headers = headers;
    return options;
  }
  private get<model>(url: string, options?: any): Observable<any> {
    options = this.addRequestHeaders(options);
    let fullUrl = this.baseUrl + url;
    return this.http.get<model>(fullUrl, options);
  }

  public getOEvent(idOEvent: number): Observable<OEvent> {
    return this.get<OEvent>('/oevents/' + idOEvent, {}).pipe(
      map(oevents => oevents[0]),first()//return the first item from the array
    );
  }

  getOEvents(name?: string, venue?: string, dateFrom?: Date, dateTo?: Date): Observable<OEvent[]> {
    let url = '/oevents/?'
    if (name != null){url += '&name=' + name}
    if (venue != null){url += '&venue=' + venue}
    if (dateFrom != null){url += '&dateFrom=' +dateFrom.getFullYear() + '-' + (dateFrom.getMonth() +1) + '-' + dateFrom.getDate();}
    if (dateTo != null){url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() +1) + '-' + dateTo.getDate();}
    return this.get<OEvent[]>(url, {});
  }

  getOEventResultSummary(oeventId: Number, maximumResults?: Number): Observable<OEventResults> {
    let url = '/resultSummaries/' + oeventId;
    if (maximumResults != null) { url += '?maximumResults=' + maximumResults; }
    const firstItem = map((events: Array<OEventResults>) => { if (events.length > 0) { return events[0] } else { return new OEventResults } })
    let theEvent = firstItem(this.get<[OEventResults]>(url));
    return theEvent;
  }
  getOEventResultSummaries(name?: String, venue?: String, dateFrom?: Date, dateTo?: Date, maximumResults?: Number): Observable<OEventResults[]> {
    let url = '/resultSummaries/?';
    if (name != null) { url += '&name=' + name; }
    if (venue != null) { url += '&venue=' + venue; }
    if (dateFrom != null) { url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate(); }
    if (dateTo != null) { url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(); }
    if (maximumResults != null) { url += '&maximumResults=' + maximumResults; }
    return this.get<OEventResults[]>(url, {});
  }

  public getCompetitor(competitorId: number):Observable<Competitor>{
    let url = `/competitors/${competitorId}`;
    return this.get<Array<Competitor>>(url, {}).pipe(
      map(competitors => competitors[0]),first()//return the first item from the array
    );    
  }

  public getCompetitorResults(competitorId: number):Observable<Result[]>{
    let url = `/competitors/${competitorId}/results`;
    return this.get<Result[]>(url, {});
  }
}
