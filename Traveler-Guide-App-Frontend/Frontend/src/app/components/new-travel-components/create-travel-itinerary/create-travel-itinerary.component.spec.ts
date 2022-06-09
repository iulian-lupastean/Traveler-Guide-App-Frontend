import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTravelItineraryComponent } from './create-travel-itinerary.component';

describe('CreateTravelItineraryComponent', () => {
  let component: CreateTravelItineraryComponent;
  let fixture: ComponentFixture<CreateTravelItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTravelItineraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTravelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
