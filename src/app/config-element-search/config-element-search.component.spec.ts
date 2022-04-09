import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigElementSearchComponent } from './config-element-search.component';

describe('ConfigElementSearchComponent', () => {
  let component: ConfigElementSearchComponent;
  let fixture: ComponentFixture<ConfigElementSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigElementSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigElementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
