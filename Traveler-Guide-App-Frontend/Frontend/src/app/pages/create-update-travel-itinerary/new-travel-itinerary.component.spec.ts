import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTravelItineraryComponent } from './new-travel-itinerary.component';

describe('NewTravelItineraryComponent', () => {
  let component: NewTravelItineraryComponent;
  let fixture: ComponentFixture<NewTravelItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTravelItineraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTravelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
