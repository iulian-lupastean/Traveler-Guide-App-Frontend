import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
@Component({
  selector: 'app-new-travel-itinerary',
  templateUrl: './new-travel-itinerary.component.html',
  styleUrls: ['./new-travel-itinerary.component.css'],
})
export class NewTravelItineraryComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  firstStepLabel!: string;
  travelId!: number;
  constructor(
    private _formBuilder: FormBuilder,
    private updateTravelService: UpdateTravelService
  ) {}

  ngOnInit() {
    this.travelId = this.updateTravelService.setSearchString();
    this.setFirstStepperLabel(this.travelId);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  setFirstStepperLabel(travelId: number) {
    if (travelId == 0) {
      this.firstStepLabel = 'Create Travel Itinerary';
    } else {
      this.firstStepLabel = 'Update Travel Itinerary';
    }
  }
  finishTravelItinerary() {
    this.updateTravelService.getTravelId(0);
    this.updateTravelService.getTravelInfo('', new Date());
  }
}
