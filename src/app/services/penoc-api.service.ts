import { HttpClient, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OEvent } from '../models/oevent.model';
import { OEventResults } from '../models/oevent-results';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Competitor } from '../models/competitor';
import { Venue } from '../models/venue';
import { Club } from '../models/club';

export class Credentials {
  username: string = '';
  password: string = '';
}

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
    let token = localStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    options.headers = headers;
    return options;
  }
  public signIn(username: string, password: string): Observable<boolean> {
    let options = this.addRequestHeaders({});
    let url = '/authenticate';
    let credentials: Credentials = new Credentials();
    credentials.username = username;
    credentials.password = password;
    return this.post<any>(url, credentials).pipe(
      map(body => {
        localStorage.setItem('token', body);
        return true;
      })
    )
  }

  public signOut() {
    localStorage.removeItem('token');
  }

  private token(): string | null {
    let token = localStorage.getItem('token');
    return (token)
  }

  public isAuthenticated(): boolean {
    let token: string | null = this.token();
    if (token) {
      return !this.isTokenExpired(token);
    }
    else { return false }
  }

  private isTokenExpired(token: string): boolean {
    const jwtPayload = JSON.parse(window.atob(token.split('.')[1]));
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return currentTimeInSeconds >= jwtPayload.exp;
  }
  
  private get<model>(url: string, options?: any): Observable<model> {
    options = this.addRequestHeaders(options);
    let fullUrl = this.baseUrl + url;
    return this.http.get<model>(fullUrl, { headers: options.headers });
  }

  private put<model>(url: string, body: model, options?: any): Observable<model> {
    options = this.addRequestHeaders(options);
    let fullUrl = this.baseUrl + url;
    return this.http.put<model>(fullUrl, body, { headers: options.headers });
  }

  private post<model>(url: string, body: any, options?: any): Observable<model> {
    options = this.addRequestHeaders(options);
    let fullUrl = this.baseUrl + url;
    return this.http.post<model>(fullUrl, body, { headers: options.headers });
  }

  public getOEvent(idOEvent: number): Observable<OEvent> {
    return this.get<OEvent[]>('/oevents/' + idOEvent, {}).pipe(
      map(oevents => oevents[0]), first()//return the first item from the array
    );
  }

  getVenues ():  Observable<Venue[]> {
    let url = '/venues';
    return this.get<Venue[]>(url);
  }
  
  getClubs ():  Observable<Club[]> {
    let url = '/clubs';
    return this.get<Club[]>(url);
  }

  getOEvents(name?: string, venue?: string, dateFrom?: Date, dateTo?: Date): Observable<OEvent[]> {
    let url = '/oevents/?'
    if (name != null) { url += '&name=' + name }
    if (venue != null) { url += '&venue=' + venue }
    if (dateFrom != null) { url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate(); }
    if (dateTo != null) { url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(); }
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

  public getCompetitor(competitorId: number): Observable<Competitor> {
    let url = `/competitors/${competitorId}`;
    return this.get<Array<Competitor>>(url, {}).pipe(
      map(competitors => competitors[0]), first()//return the first item from the array
    );
  }

  public getCompetitorResults(competitorId: number): Observable<Result[]> {
    let url = `/competitors/${competitorId}/results`;
    return this.get<Result[]>(url, {});
  }

  public saveOEvent(oEvent: OEvent): Observable<OEvent> {
    const url = '/oevents'
    return this.put(url, oEvent, {});
  }
}
