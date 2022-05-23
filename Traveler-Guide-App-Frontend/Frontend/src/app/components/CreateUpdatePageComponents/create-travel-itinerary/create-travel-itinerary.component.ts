import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
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
  newDate!: string;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      nameControl: this.nameControl,
      dateControl: this.dateControl,
    });
    this.picker = new Date(new Date().getTime());
    var info = this.updateTravelService.setTravelInfo();
    console.log(info);

    this.nameControl.setValue(info[0]);
    this.dateControl.setValue(info[1]);
  }
  SaveTravelItinerary() {
    this.TravelId = this.updateTravelService.setSearchString();
    if (this.TravelId != 0) {
      this.travelService.updateTravelitinerary(this.TravelId, {
        travelId: this.TravelId,
        name: this.Name,
        status: 'Planned',
        travelDate: this.Date,
        userId: userId,
      });
      this.updateTravelService.getTravelId(0);
    } else {
      console.log(this.Date);

      this.travelService.createNewTravelItinerary(this.Name, this.Date);
      console.log(this.dateControl);
    }
  }
}
