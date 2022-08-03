import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Event } from './event';
import { EVENTS } from './mock-events';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a EventService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EventService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private eventsUrl: string = environment.backend.eventsUrl;

  //private eventsUrl = '/server/api/events';  // URL to web api
  //private eventsUrl = 'http://ecalapp-env.eba-pmjqqcen.eu-west-2.elasticbeanstalk.com/server/api/events'; // URL to web api

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET events from the server */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl)
      .pipe(
        tap(_ => this.log('fetched events')),
        catchError(this.handleError<Event[]>('getEvents', []))
      );
  }

  /** GET next x days (upcoming) events from the server */
  getUpcomingEvents(noOfDays: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/upcoming?noOfDays=${noOfDays}`)
      .pipe(
        tap(_ => this.log('fetched events')),
        catchError(this.handleError<Event[]>('getEvents', []))
      );
  }

  /** GET event by id. Will 404 if id not found */
  getEvent(id: number): Observable<Event> {
    if (id === 0) {
      return of(this.initializeEvent())
    }
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get<Event>(url).pipe(
      tap(_ => this.log(`fetched event id=${id}`)),
      catchError(this.handleError<Event>(`getEvent id=${id}`))
    );
  }

  /** PUT: update the event on the server */
  updateEvent(event: Event): Observable<Event> {
    const url = `${this.eventsUrl}/${event.id}`;
    return this.http.put<Event>(url, event, this.httpOptions).pipe(
      tap((event: Event) => this.log(`updated event w/ id=${event.id}`)),
      catchError(this.handleError<Event>('updateEvent'))
    );
  }

  /** POST: add a new event to the server */
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event, this.httpOptions).pipe(
      tap((event: Event) => this.log(`added event w/ id=${event.id}`)),
      catchError(this.handleError<Event>('addEvent'))
    );
  }

  /** DELETE: delete the event from the server */
  deleteEvent(id: number): Observable<Event> {
    const url = `${this.eventsUrl}/${id}`;

    return this.http.delete<Event>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted event id=${id}`)),
      catchError(this.handleError<Event>('deleteEvent'))
    );
  }

  /* GET events whose name contains search term */
  searchEvents(term: string): Observable<Event[]> {
    if (!term.trim()) {
      // if not search term, return empty events array.
      this.log(`no search term`);
      return of([]);
    }
    return this.http.get<Event[]>(`${this.eventsUrl}/search?eventName=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found ${x.length} events matching "${term}"`) :
        this.log(`no events matching "${term}"`)),
      catchError(this.handleError<Event[]>('searchEvents', []))
    );
  }

  private initializeEvent(): Event {
    // Return an initialized object
    return {
      id: 0,
      eventName: '',
      startDate: new Date(""),
      endDate:  new Date("")
    };
  }

}

