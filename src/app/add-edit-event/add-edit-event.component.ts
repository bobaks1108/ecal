import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../event';
import { EventService } from '../event.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControlName } from '@angular/forms';
import { debounceTime, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { GenericValidator } from '../shared/generic-validator';


@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.sass']
})
export class AddEditEventComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  eventForm: UntypedFormGroup = new UntypedFormGroup({});
  private sub: Subscription = new Subscription;
  pageTitle = 'Event edit';  
  errorMessage: String = '';
  event: Event | undefined;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // private validationMessages = {
  //   required: 'Please enter an event name.',
  //   eventToLong: 'Event name too long'
  // }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private location: Location,
    private fb: UntypedFormBuilder
  ) {

      // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      eventName: {
        required: 'Event name is required.',
        maxlength: 'Event name cannot exceed 50 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.maxLength(25)]]
    })

    // every time the name is changed
    const nameControl = this.eventForm.get('eventName');



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

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.eventForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(200)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventForm);
    });
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
      this.pageTitle = `Edit Event: ${this.event.eventName}`;
    }

    // Update the data on the form
    this.eventForm.patchValue({
      eventName: this.event.eventName
    });
  }

  populateTestData(): void {
    this.eventForm?.patchValue({
      eventName: 'testname'
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
