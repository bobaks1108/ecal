import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { ConfigElement } from '../config-element';
import { ConfigElementService } from '../config-element.service';

@Component({
  selector: 'app-config-element-search',
  templateUrl: './config-element-search.component.html',
  styleUrls: [ './config-element-search.component.css' ]
})
export class ConfigElementSearchComponent implements OnInit {
  configuration$!: Observable<ConfigElement[]>;
  private searchTerms = new Subject<string>();

  constructor(private configElementService: ConfigElementService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.configuration$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.configElementService.searchConfiguration(term)),
    );
  }
}
