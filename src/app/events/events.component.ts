import { Component, OnInit } from '@angular/core';

import { Event } from '../event';
import { EventService } from '../event.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
    .subscribe(events => this.events = events);
  }

  add(eventName: string): void {
    eventName = eventName.trim();
    if (!eventName) { return; }
    this.eventService.addEvent({ eventName } as Event)
      .subscribe(event => {
        this.events.push(event);
      });
  }

  delete(event: Event): void {
    this.events = this.events.filter(h => h !== event);
    this.eventService.deleteEvent(event.id).subscribe();
  }

}