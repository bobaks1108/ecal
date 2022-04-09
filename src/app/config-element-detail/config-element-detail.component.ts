import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ConfigElement } from '../config-element';
import { ConfigElementService } from '../config-element.service';

@Component({
  selector: 'app-config-element-detail',
  templateUrl: './config-element-detail.component.html',
  styleUrls: ['./config-element-detail.component.css']
})
export class ConfigElementDetailComponent implements OnInit {

  configElement: ConfigElement | undefined;

  constructor(
    private route: ActivatedRoute,
    private configElementService: ConfigElementService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getConfigElement();
  }
  
  getConfigElement(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.configElementService.getConfigElement(id)
      .subscribe(configElement => this.configElement = configElement);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.configElement) {
      this.configElementService.updateConfigElement(this.configElement)
        .subscribe(() => this.goBack());
    }
  }

}