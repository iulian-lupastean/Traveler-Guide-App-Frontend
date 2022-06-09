import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsDirectionsComponent } from './locations-directions.component';

describe('LocationsDirectionsComponent', () => {
  let component: LocationsDirectionsComponent;
  let fixture: ComponentFixture<LocationsDirectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsDirectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
