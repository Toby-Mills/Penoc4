import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OEvent } from '../models/oevent.model';
import { OEventSummary } from '../models/oevent-summary';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class PenocApiService {
  //baseUrl: string = 'http://localhost/penoc/api';
  apiKey: string = 'Orienteering';
  baseUrl: string = 'http://www.penoc.org.za/api';


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
    return this.get<OEvent>('/oevents/' + idOEvent, {});
  }

  getOEvents(name?: string, venue?: string, dateFrom?: Date, dateTo?: Date): Observable<OEvent[]> {
    let url = '/oevents/?'
    if (name != null){url += '&name=' + name}
    if (venue != null){url += '&venue=' + venue}
    if (dateFrom != null){url += '&dateFrom=' +dateFrom.getFullYear() + '-' + (dateFrom.getMonth() +1) + '-' + dateFrom.getDate();}
    if (dateTo != null){url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() +1) + '-' + dateTo.getDate();}
    return this.get<OEvent[]>(url, {});
  }

  getOEventResultSummary(oeventId: Number, maximumResults?: Number): Observable<OEventSummary> {
    let url = '/resultSummaries/' + oeventId;
    if (maximumResults != null) { url += '?maximumResults=' + maximumResults; }
    const firstItem = map((events: Array<OEventSummary>) => { if (events.length > 0) { return events[0] } else { return new OEventSummary } })
    let theEvent = firstItem(this.get<[OEventSummary]>(url));
    return theEvent;
  }
  getOEventResultSummaries(name?: String, venue?: String, dateFrom?: Date, dateTo?: Date, maximumResults?: Number): Observable<OEventSummary[]> {
    let url = '/resultSummaries/?';
    if (name != null) { url += '&name=' + name; }
    if (venue != null) { url += '&venue=' + venue; }
    if (dateFrom != null) { url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate(); }
    if (dateTo != null) { url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(); }
    if (maximumResults != null) { url += '&maximumResults=' + maximumResults; }
    return this.get<OEventSummary[]>(url, {});
  }
}
