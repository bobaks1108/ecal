import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ConfigElement } from './config-element';
import { CONFIGURATION } from './mock-configuration'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigElementService {

  constructor(private messageService: MessageService) { }

  getConfiguration(): Observable<ConfigElement[]> {
    const configuration = of(CONFIGURATION);
    this.messageService.add('ConfigElement: fetched configuration');
    return configuration;
  }

  getConfigElement(id: number): Observable<ConfigElement> {
    // For now, assume that a configElement with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const configElement = CONFIGURATION.find(h => h.id === id)!;
    this.messageService.add(`ConfigElementService: fetched configElement id=${id}`);
    return of(configElement);
  }
  
}
