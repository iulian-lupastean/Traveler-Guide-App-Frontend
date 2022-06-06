import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishTravelItineraryComponent } from './finish-travel-itinerary.component';

describe('FinishTravelItineraryComponent', () => {
  let component: FinishTravelItineraryComponent;
  let fixture: ComponentFixture<FinishTravelItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishTravelItineraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishTravelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
