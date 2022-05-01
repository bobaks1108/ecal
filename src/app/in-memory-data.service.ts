import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from './event';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let events = [
      { id: 10, name: 'New Years Day', startDate: '2022-04-01 00:00:00', endDate: '2022-04-02 00:00:00' },
      { id: 11, name: 'Event2', startDate: '2022-04-01 00:00:00', endDate: '2022-04-02 00:00:00' },
      { id: 12, name: 'Event3', startDate: '2022-04-01 00:00:00', endDate: '2022-04-02 00:00:00' },
      { id: 13, name: 'Event4', startDate: '2022-04-01 00:00:00', endDate: '2022-04-02 00:00:00' },
    ];
    let configuration = [
      { id: 11, name: 'clockwise', value: true },
      { id: 12, name: 'theme', value: 'light' },
      { id: 13, name: 'number_of_top_events', value: 5 }
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

// "id": 2,
// "name": "April Fools Day",
// "startDate": "2022-04-01 00:00:00",
// "endDate": "2022-04-01 23:59:59"

//[{"id":12,"name":"asdasasdasd","startDate":"2022-03-31 23:00:00","endDate":"2022-03-31 23:00:00"},{"id":35,"name":"676686786","startDate":"2022-03-31 23:00:00","endDate":"2022-03-31 23:00:00"}]