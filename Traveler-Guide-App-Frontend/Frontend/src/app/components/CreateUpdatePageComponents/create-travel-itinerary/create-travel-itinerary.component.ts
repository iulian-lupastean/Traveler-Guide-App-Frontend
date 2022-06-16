import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TravelService } from 'src/app/services/travel.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { MatStepper } from '@angular/material/stepper/stepper';
@Component({
  selector: 'app-create-travel-itinerary',
  templateUrl: './create-travel-itinerary.component.html',
  styleUrls: ['./create-travel-itinerary.component.css'],
})
export class CreateTravelItineraryComponent implements OnInit {
  @Output()
  sendToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() enableLoadComponent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  frmStepOne!: FormGroup;
  @ViewChild('stepper')
  stepper!: MatStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService,
  ) { }
  TravelId: number = 0;
  Name: string = '';
  Date: Date = new Date();
  CurrentDate:Date = new Date();
  Title: string = '';
  ngOnInit() {
    this.TravelId = this.updateTravelService.getTravelId();
    this.setTitle(this.TravelId);
    this.frmStepOne = this._formBuilder.group({
      nameControl: ['', [Validators.required]],
      dateControl: ['', [Validators.required]]
    });
    var info = this.updateTravelService.getTravelInfo();
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
    this.sendToParent.emit(this.Name);
    if (this.TravelId != 0) {
      this.travelService.updateTravelitinerary(this.TravelId, {
        travelId: this.TravelId,
        name: this.Name,
        status: 'Planned',
        travelDate: this.Date,
        userId: Number(localStorage.getItem("userId")),
      });
    } else {
      this.updateTravelService.setTravelInfo(this.Name, this.Date);
      this.travelService.createNewTravelItinerary(this.Name, this.Date);

    }

    this.enableLoadComponent.emit(true);
  }
}
