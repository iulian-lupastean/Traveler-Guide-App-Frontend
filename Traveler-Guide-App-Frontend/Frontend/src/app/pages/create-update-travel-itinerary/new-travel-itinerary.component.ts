import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import CitiesComponent from 'src/app/components/CreateUpdatePageComponents/add-or-remove-locations/cities.component';
import { CreateTravelItineraryComponent } from 'src/app/components/CreateUpdatePageComponents/create-travel-itinerary/create-travel-itinerary.component';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { verifyBudget } from 'src/assets/Validators/budget-validator';
@Component({
  selector: 'app-new-travel-itinerary',
  templateUrl: './new-travel-itinerary.component.html',
  styleUrls: ['./new-travel-itinerary.component.css'],
})
export default class NewTravelItineraryComponent implements OnInit {
  isLinear = false;
  createTravelFormGroup!: FormGroup;
  addLocationsFormGroup!: FormGroup;
  firstStepLabel!: string;
  travelId!: number;
  parentName!: string;
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild(CreateTravelItineraryComponent) stepOneComponent!: CreateTravelItineraryComponent;
  @ViewChild(CitiesComponent) stepTwoComponent!: CitiesComponent;
  constructor(
    private _formBuilder: FormBuilder,
    private updateTravelService: UpdateTravelService
  ) { }

  get frmStepOne() {
    return this.stepOneComponent ? this.stepOneComponent.frmStepOne : null;
  }

  get frmStepTwo() {
    return this.stepTwoComponent ? this.stepTwoComponent.frmStepTwo : null;
  }


  ngOnInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.setFirstStepperLabel(this.travelId);

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

  createNewTravelItinerary(event: any) {
    this.stepper.reset();
  }
}
