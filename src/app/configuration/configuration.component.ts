import { Component, OnInit } from '@angular/core';

import { ConfigElement } from '../config-element';
import { ConfigElementService } from '../config-element.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  selectedConfigElement?: ConfigElement;
  
  configuration: ConfigElement[] = [];

  constructor(private ConfigElementService: ConfigElementService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getConfiguration();
  }

  onSelect(configElement: ConfigElement): void {
    this.selectedConfigElement = configElement;
    this.messageService.add(`ConfigurationComponent: Selected configElement id=${configElement.id}`);
  }

  getConfiguration(): void {
    this.ConfigElementService.getConfiguration()
        .subscribe(configuration => this.configuration = configuration);
  }

  getType(configElement: ConfigElement) {
    return typeof configElement.value; 
  }
}