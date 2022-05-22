import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: [ './event-detail.component.css' ]
})
export class EventDetailComponent implements OnInit {

  event: Event | undefined;

  events: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEvent();
  }
  
  getEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEvent(id)
      .subscribe(event => this.event = event);
  }

  save(): void {
    if (this.event) {
      this.eventService.updateEvent(this.event)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.eventService.addEvent({ name } as Event)
      .subscribe(event => {
        this.events.push(event);
      });
  }

}