import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
@Component({
  selector: 'app-new-travel-itinerary',
  templateUrl: './new-travel-itinerary.component.html',
  styleUrls: ['./new-travel-itinerary.component.css'],
})
export default class NewTravelItineraryComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  globalFormGroup!: FormGroup;
  firstStepLabel!: string;
  travelId!: number;
  parentName!: string;
  loadcitiesComponent: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private updateTravelService: UpdateTravelService
  ) {}

  ngOnInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.setFirstStepperLabel(this.travelId);
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });
    this.globalFormGroup = this._formBuilder.group({
      firstGroup: this._formBuilder.group({
        nameCtrl: ['', Validators.required],
        travelDateCtrl: ['', Validators.required],
      }),
      secondGroup: this._formBuilder.group({
        locationNameCtrl: [],
      }),
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
    this.updateTravelService.setTravelId(0);
    this.updateTravelService.setTravelInfo('', new Date());
  }
  nameChange(event: string) {
    this.parentName = event;
  }
  setTravelName() {
    return this.parentName;
  }
  loadComponent(event: boolean) {
    this.loadcitiesComponent = event;
  }
  loadCitiesComponent() {
    return this.loadcitiesComponent;
  }
}
