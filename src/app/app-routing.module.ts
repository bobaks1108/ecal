import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-edit-event/:id', component: AddEditEventComponent },
  { path: 'add-edit-event', component: AddEditEventComponent },
  { path: 'events', component: EventsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}