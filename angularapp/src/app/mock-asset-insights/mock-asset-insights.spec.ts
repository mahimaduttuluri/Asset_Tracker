import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockAssetInsights } from './mock-asset-insights';

describe('MockAssetInsights', () => {
  let component: MockAssetInsights;
  let fixture: ComponentFixture<MockAssetInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockAssetInsights],
    }).compileComponents();

    fixture = TestBed.createComponent(MockAssetInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
