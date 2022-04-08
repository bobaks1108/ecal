import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigElementDetailComponent } from './config-element-detail.component';

describe('ConfigElementDetailComponent', () => {
  let component: ConfigElementDetailComponent;
  let fixture: ComponentFixture<ConfigElementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigElementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigElementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
