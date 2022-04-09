import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from './event';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events = [
      { id: 10, name: 'New Years Day' },
      { id: 11, name: 'Good Friday' },
      { id: 12, name: 'Easter Monday' },
      { id: 13, name: 'May Day' },
      { id: 14, name: 'Jubilee' },
      { id: 14, name: 'Late Summer BH' }
    ];
    let configuration = [
      { id: 11, name: 'clockwise', value: true },
      { id: 12, name: 'theme', value: 'light' }
  ];
    return {events, configuration};
  }

  // Overrides the genId method to ensure that a event always has an id.
  // If the events array is empty,
  // the method below returns the initial number (11).
  // if the events array is not empty, the method below returns the highest
  // event id + 1.
  genId(events: Event[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 11;
  }
}