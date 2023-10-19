import { HttpClient, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OEvent } from '../models/oevent.model';
import { OEventResults } from '../models/oevent-results';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Competitor } from '../models/competitor';
import { Venue } from '../models/venue';
import { Club } from '../models/club';
import { Course } from '../models/course';
import { Difficulty } from '../models/difficulty';
import { CourseResults } from '../models/course-results';

export class Credentials {
  username: string = '';
  password: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class PenocApiService {
  apiKey: string = environment.apiKey;
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
    let bodyString = this.toJsonString(body);
    return this.http.put<model>(fullUrl, bodyString, { headers: options.headers });
  }

  private post<model>(url: string, body: any, options?: any): Observable<model> {
    options = this.addRequestHeaders(options);
    let fullUrl = this.baseUrl + url;
    let bodyString = this.toJsonString(body);
    return this.http.post<model>(fullUrl, bodyString, { headers: options.headers });
  }

  private delete<model>(url: string, options?: any): Observable<model> {
    options = this.addRequestHeaders(options);
    let fullUrl = this.baseUrl + url;
    return this.http.delete<model>(fullUrl, { headers: options.headers });
  }

  public getOEvent(idOEvent: number): Observable<OEvent> {
    return this.get<OEvent[]>('/oevents/' + idOEvent, {}).pipe(
      map(oevents => oevents[0]), first()//return the first item from the array
    );
  }

  //------ Lookups ------
  getVenues(): Observable<Venue[]> {
    let url = '/venues';
    return this.get<Venue[]>(url);
  }

  getClubs(): Observable<Club[]> {
    let url = '/clubs';
    return this.get<Club[]>(url);
  }

  getDifficulties(): Observable<Difficulty[]> {
    let url = '/technicalDifficulties';
    return this.get<Difficulty[]>(url);
  }

  //------- OEvents -------
  getOEvents(name?: string, venue?: string, dateFrom?: Date, dateTo?: Date): Observable<OEvent[]> {
    let url = '/oevents/?'
    if (name != null) { url += '&name=' + name }
    if (venue != null) { url += '&venue=' + venue }
    if (dateFrom != null) { url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate(); }
    if (dateTo != null) { url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(); }
    return this.get<OEvent[]>(url, {});
  }

  public addOEvent(oEvent: OEvent): Observable<OEvent> {
    const url = '/oevents';
    return this.post(url, oEvent, {});
  }

  public saveOEvent(oEvent: OEvent): Observable<OEvent> {
    const url = '/oevents'
    return this.put(url, oEvent, {});
  }

  //------- Results -------
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
    return this.get<OEventResults[]>(url, {}).pipe(map((data) => {
      for (let event of data){
        for (let course of event.courseResults){
          for (let result of course.results){
            result.time = new Date(result.time + 'Z');
          }
        }
      }
      return data;
    }));
  }

  public getCompetitorResults(competitorId: number): Observable<Result[]> {
    let url = `/competitors/${competitorId}/results`;
    return this.get<Result[]>(url, {});
  }

  //------- Competitors -------
  public getCompetitor(competitorId: number): Observable<Competitor> {
    let url = `/competitors/${competitorId}`;
    return this.get<Array<Competitor>>(url, {}).pipe(
      map(competitors => competitors[0]), first()//return the first item from the array
    );
  }

  public searchCompetitors(competitorName: string): Observable<Competitor[]> {
    let url = `/competitors?name=${competitorName}`;
    return this.get<Competitor[]>(url, {});
  }

  public searchIndividuals(competitorName: string): Observable<Competitor[]> {
    let url = `/competitors/individuals?name=${competitorName}`;
    return this.get<Competitor[]>(url, {});
  }

  //------- Courses -------
  getOEventCourses(oEventId: number): Observable<Course[]> {
    let url = `/oevents/${oEventId}/courses`;
    return this.get<Course[]>(url, {});
  }

  public saveCourse(course: Course): Observable<Course> {
    const url = `/courses`;
    return this.put<Course>(url, course, {});
  }

  public deleteCourse(courseId: number): Observable<any> {
    let url = `/courses/${courseId}`;
    return this.delete(url, {});
  }

  public addCourse(course: Course): Observable<Course> {
    let url = `/courses/`;
    return this.post(url, course, {});
  }

  //------- Results -------
  getCourseResults(courseId: number): Observable<any> {
    let urlCourse = `/courses/${courseId}`;
    let urlResults = `/courses/${courseId}/results`;
    const courses = this.get<Course[]>(urlCourse,{}).pipe(
      map(data => data[0])
    );

    const results = this.get<Result[]>(urlResults, {}).pipe(
      map(data => {
        for (let result of data){
          result.time = new Date(result.time + 'Z');
        }
        return data;
      })
    );
    return forkJoin({course:courses, results:results});
  }

  public saveCourseResults(courseId: number, results: Result[]): Observable<Result[]> {
    let url = `/courses/${courseId}/results`;
    return this.put(url, results, {})
  }

  private toJsonString(jsonObject: any): string {
    let jsonString = JSON.stringify(jsonObject, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    })
    return jsonString;
  }
}
