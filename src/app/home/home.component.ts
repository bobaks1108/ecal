import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  events: Event[] = [];

  noOfDaysForUpcomingEvents = this.getNoOfDaysForUpcomingEvents();

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getUpcomingEvents(this.noOfDaysForUpcomingEvents);
  }

  getUpcomingEvents(noOfEvents: number): void {
    this.eventService.getUpcomingEvents(noOfEvents)
      .subscribe(events => this.events = events);
  }

  getNoOfDaysForUpcomingEvents(): number {
    return 28; // to do get this from configuration number_of_top_events
  }

}
