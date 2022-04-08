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
  
}
