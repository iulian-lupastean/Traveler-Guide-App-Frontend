import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-travel-itinerary',
  templateUrl: './create-travel-itinerary.component.html',
  styleUrls: ['./create-travel-itinerary.component.css'],
})
export class CreateTravelItineraryComponent implements OnInit {
  firstFormGroup!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}
  picker: any;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.picker = new Date(new Date().getTime() - 3888000000);
  }
}
