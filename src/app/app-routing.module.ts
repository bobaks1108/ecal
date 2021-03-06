import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigElementDetailComponent } from './config-element-detail/config-element-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: EventDetailComponent },
  { path: 'events', component: EventsComponent },
  { path: 'config-element-detail/:id', component: ConfigElementDetailComponent },
  { path: 'configuration', component: ConfigurationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}