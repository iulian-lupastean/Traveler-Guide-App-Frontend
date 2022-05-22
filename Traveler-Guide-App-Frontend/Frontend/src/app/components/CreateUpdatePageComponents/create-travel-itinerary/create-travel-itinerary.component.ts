import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-create-travel-itinerary',
  templateUrl: './create-travel-itinerary.component.html',
  styleUrls: ['./create-travel-itinerary.component.css'],
})
export class CreateTravelItineraryComponent implements OnInit {
  firstFormGroup!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private travelService: TravelService
  ) {}
  picker: any;
  Name!: string;
  Date!: Date;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.picker = new Date(new Date().getTime() - 3888000000);
  }
  SaveTravelItinerary() {
    this.travelService.createNewTravelItinerary(this.Name, this.Date);
  }
}
