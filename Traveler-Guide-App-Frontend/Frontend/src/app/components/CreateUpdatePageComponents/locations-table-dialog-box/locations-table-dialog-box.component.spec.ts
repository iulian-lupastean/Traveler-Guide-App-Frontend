import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsTableDialogBoxComponent } from './locations-table-dialog-box.component';

describe('LocationsTableDialogBoxComponent', () => {
  let component: LocationsTableDialogBoxComponent;
  let fixture: ComponentFixture<LocationsTableDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsTableDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsTableDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
