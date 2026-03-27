import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrackingMap } from './live-tracking-map';

describe('LiveTrackingMap', () => {
  let component: LiveTrackingMap;
  let fixture: ComponentFixture<LiveTrackingMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveTrackingMap],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveTrackingMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
