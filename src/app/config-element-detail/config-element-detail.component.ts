import { Component, OnInit, Input } from '@angular/core';
import { ConfigElement } from '../config-element';

@Component({
  selector: 'app-config-element-detail',
  templateUrl: './config-element-detail.component.html',
  styleUrls: ['./config-element-detail.component.sass']
})
export class ConfigElementDetailComponent implements OnInit {

  @Input() configElement?: ConfigElement;

  constructor() { }

  ngOnInit(): void {
  }

}