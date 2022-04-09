import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ConfigElement } from './config-element';
import { CONFIGURATION } from './mock-configuration'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigElementService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`ConfigElementService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private configurationUrl = 'api/configuration';  // URL to web api

  /** GET configuration from the server */
  getConfiguration(): Observable<ConfigElement[]> {
    return this.http.get<ConfigElement[]>(this.configurationUrl)
    .pipe(
      tap(_ => this.log('fetched configuration.')),
      catchError(this.handleError<ConfigElement[]>('getConfiguration', []))
    );
  }

  /** GET ConfigElement by id. Will 404 if id not found */
  getConfigElement(id: number): Observable<ConfigElement> {
    const url = `${this.configurationUrl}/${id}`;
    return this.http.get<ConfigElement>(url).pipe(
      tap(_ => this.log(`fetched configElement id=${id}`)),
      catchError(this.handleError<ConfigElement>(`getConfigElement id=${id}`))
    );
}

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

  /** PUT: update the configElement on the server */
  updateConfigElement(configElement: ConfigElement): Observable<any> {
    return this.http.put(this.configurationUrl, configElement, this.httpOptions).pipe(
      tap(_ => this.log(`updated configElement id=${configElement.id}`)),
      catchError(this.handleError<any>('updateConfigElement'))
    );
  }

  /** POST: add a new configElement to the server */
  addConfigElement(configElement: ConfigElement): Observable<ConfigElement> {
    return this.http.post<ConfigElement>(this.configurationUrl, configElement, this.httpOptions).pipe(
      tap((newConfigElement: ConfigElement) => this.log(`added configElement w/ id=${newConfigElement.id}`)),
      catchError(this.handleError<ConfigElement>('addConfigElement'))
    );
  }

  /** DELETE: delete the configElement from the server */
  deleteConfigElement(id: number): Observable<ConfigElement> {
    const url = `${this.configurationUrl}/${id}`;

    return this.http.delete<ConfigElement>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted configElement id=${id}`)),
      catchError(this.handleError<ConfigElement>('deleteConfigElement'))
    );
  }

  /* GET configuration whose name contains search term */
  searchConfiguration(term: string): Observable<ConfigElement[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<ConfigElement[]>(`${this.configurationUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
      this.log(`found configuration matching "${term}"`) :
      this.log(`no configuration matching "${term}"`)),
      catchError(this.handleError<ConfigElement[]>('searchConfiguration', []))
    );
  }
  
}
