import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EventsComponent,
    EventDetailComponent,
    MessagesComponent
  ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule { }