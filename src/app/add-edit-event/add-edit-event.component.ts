import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../event';
import { EventService } from '../event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.sass']
})
export class AddEditEventComponent implements OnInit {

  eventForm: FormGroup = new FormGroup({});
  private sub: Subscription = new Subscription;
  pageTitle = 'Event edit';  
  errorMessage: String = '';
  event: Event | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ''
    })

    this.sub = this.route.paramMap.subscribe(
      params => {
        // + converts to number 
        // The ! is the non-null assertion operator. 
        // You are telling typescript "i know this looks like it might be null/undefined, but trust me,
        // it's not"
        const id = +params.get('id')!;
        this.getEvent(id);
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getEvent(id: number): void {
    this.eventService.getEvent(id)
      .subscribe({
        next: (event: Event) => this.displayEvent(event),
        error: err => this.errorMessage = err
      });
  }

  displayEvent(event: Event): void {
    if (this.eventForm) {
      this.eventForm.reset();
    }
    this.event = event;

    if (this.event.id === 0) {
      this.pageTitle = 'Add Event';
    } else {
      this.pageTitle = `Edit Event: ${this.event.name}`;
    }

    // Update the data on the form
    this.eventForm.patchValue({
      name: this.event.name
    });
  }

  populateTestData(): void {
    this.eventForm?.patchValue({
      name: 'testname'
    })
  }


  saveEvent(): void {
    if (this.eventForm.valid) {
      if (this.eventForm.dirty) {
        const p = { ...this.event, ...this.eventForm.value };

        if (p.id === 0) {
          this.eventService.addEvent(p)
            .subscribe({
              next: () => this.onSaveComplete()
            });
        } else {
          this.eventService.updateEvent(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.eventForm.reset();
    this.router.navigate(['/events']);
  }

  /// TODO Convert to reactive form - update works -fix add 

  save(): void {
    
  }


}
