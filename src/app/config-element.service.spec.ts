import { TestBed } from '@angular/core/testing';

import { ConfigElementService } from './config-element.service';

describe('ConfigElementService', () => {
  let service: ConfigElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
