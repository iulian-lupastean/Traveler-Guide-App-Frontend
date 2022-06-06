import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { verifyBudget } from 'src/assets/Validators/budget-validator';
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
  @ViewChild('stepper') stepper!: MatStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private updateTravelService: UpdateTravelService
  ) { }

  ngOnInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.setFirstStepperLabel(this.travelId);
    this.globalFormGroup = this._formBuilder.group({
      firstGroup: this._formBuilder.group({
        nameCtrl: ['', Validators.required],
        travelDateCtrl: ['', Validators.required],
      }),
      secondGroup: this._formBuilder.group({
        locationNameCtrl: ['', Validators.required],
        locationAddressCtrl: ['', Validators.required],
        locationPriority: ['', Validators.required],
        locationBudget: [0, verifyBudget(0)],
        locationDescription: ['']
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
  createNewTravelItinerary(event: any) {
    this.stepper.reset();
  }
}
