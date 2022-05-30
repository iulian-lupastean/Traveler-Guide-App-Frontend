import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TravelService } from 'src/app/services/travel.service';
import { userId } from 'src/app/Globals';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
@Component({
  selector: 'app-create-travel-itinerary',
  templateUrl: './create-travel-itinerary.component.html',
  styleUrls: ['./create-travel-itinerary.component.css'],
})
export class CreateTravelItineraryComponent implements OnInit {
  firstFormGroup!: FormGroup;
  nameControl = new FormControl();
  dateControl = new FormControl();
  constructor(
    private _formBuilder: FormBuilder,
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService
  ) {}
  picker: any;
  TravelId!: number;
  Name!: string;
  Date!: Date;
  Title!: string;
  newDate!: string;
  ngOnInit() {
    this.TravelId = this.updateTravelService.setSearchString();
    this.setTitle(this.TravelId);
    console.log(this.TravelId);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      nameControl: this.nameControl,
      dateControl: this.dateControl,
    });
    this.picker = new Date(new Date().getTime());
    var info = this.updateTravelService.setTravelInfo();

    this.Name = info[0] as string;
    this.Date = info[1] as Date;
  }
  setTitle(travelId: number) {
    if (travelId == 0) {
      this.Title = 'Create New Travel Itinerary';
    } else {
      this.Title = 'Update Travel Itinerary';
    }
  }
  SaveTravelItinerary() {
    if (this.TravelId != 0) {
      this.travelService.updateTravelitinerary(this.TravelId, {
        travelId: this.TravelId,
        name: this.Name,
        status: 'Planned',
        travelDate: this.Date,
        userId: userId,
      });
    } else {
      this.travelService.createNewTravelItinerary(this.Name, this.Date);
    }
  }
}
