import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';
import { EventService } from './event.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { MessagesComponent } from './messages/messages.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

// material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core' 
import { AngularMaterialModule } from './angular-material.module';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    AngularMaterialModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    EventDetailComponent,
    MessagesComponent,
    EventSearchComponent,
    AddEditEventComponent
    
  ],
  bootstrap: [ AppComponent ],
  providers: [ EventService, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
