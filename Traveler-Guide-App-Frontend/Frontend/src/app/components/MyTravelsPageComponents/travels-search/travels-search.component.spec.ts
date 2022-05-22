import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsSearchComponent } from './travels-search.component';

describe('TravelsSearchComponent', () => {
  let component: TravelsSearchComponent;
  let fixture: ComponentFixture<TravelsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
