import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Event } from './event';
import { EVENTS } from './mock-events';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private messageService: MessageService) { }

  getEvents(): Observable<Event[]> {
    const events = of(EVENTS);
    this.messageService.add('EventService: fetched events');
    return events;
  }

  getEvent(id: number): Observable<Event> {
    // For now, assume that a event with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const event = EVENTS.find(h => h.id === id)!;
    this.messageService.add(`EventService: fetched event id=${id}`);
    return of(event);
  }

}
