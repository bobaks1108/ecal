import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  events: Event[] = [];

  noOfTopEventsToShow = this.getNoOfTopEventsToShow();

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getTopEvents(this.noOfTopEventsToShow);
  }

  getTopEvents(noOfEvents: number): void {
    this.eventService.getEvents()
      .subscribe(events => this.events = events.slice(0, noOfEvents));
  }

  getNoOfTopEventsToShow(): number {
    return 5; // get this deom configuration number_of_top_events
  }

}
