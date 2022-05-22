import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelItinerariesComponent } from './travel-itineraries.component';

describe('TravelItinerariesComponent', () => {
  let component: TravelItinerariesComponent;
  let fixture: ComponentFixture<TravelItinerariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelItinerariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelItinerariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
