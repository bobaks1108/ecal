import { Injectable } from '@angular/core';
import { Event } from './event';
import { EVENTS } from './mock-events';
import { Observable, of } from 'rxjs';
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

}
