import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTravelComponent } from './add-new-travel.component';

describe('AddNewTravelComponent', () => {
  let component: AddNewTravelComponent;
  let fixture: ComponentFixture<AddNewTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
