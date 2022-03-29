import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  selectedEvent?: Event;

  events: Event[] = [];

  constructor(private eventService: EventService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  onSelect(event: Event): void {
    this.selectedEvent = event;
    this.messageService.add(`EventComponent: Selected event id=${event.id}`);
  }

  getEvents(): void {
    this.eventService.getEvents()
        .subscribe(events => this.events = events);
  }

}
