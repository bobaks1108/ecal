import { Component, OnInit } from '@angular/core';

import { ConfigElement } from '../config-element';
import { ConfigElementService } from '../config-element.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  
  configuration: ConfigElement[] = [];

  constructor(private configElementService: ConfigElementService) {}

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration(): void {
    this.configElementService.getConfiguration()
        .subscribe(configuration => this.configuration = configuration);
  }

  getType(configElement: ConfigElement) {
    return typeof configElement.value; 
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.configElementService.addConfigElement({ name } as ConfigElement)
      .subscribe(configElement => {
        this.configuration.push(configElement);
      });
  }

  delete(configElement: ConfigElement): void {
    this.configuration = this.configuration.filter(h => h !== configElement);
    this.configElementService.deleteConfigElement(configElement.id).subscribe();
  }
  
}