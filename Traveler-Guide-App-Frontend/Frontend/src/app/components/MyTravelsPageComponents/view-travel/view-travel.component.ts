import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
import { TravelService } from 'src/app/services/travel.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.css'],
})
export class ViewTravelComponent implements OnInit {
  @Input()
  uniqueTravel!: ITravelItinerary;
  locations!: Observable<ILocation[]>;
  getTravel!: Observable<ITravelItinerary>;
  constructor(
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService
  ) {}

  ngOnInit() {}
  getLocations(id: number) {
    console.log(id);
    this.locations = this.travelService.getLocationsForTravel(id);
  }
  updateTravel(travelId: number) {
    this.updateTravelService.getTravelId(travelId);
    this.travelService.getTravelItineraryById(travelId).subscribe((value) => {
      this.updateTravelService.getTravelInfo(value.name, value.travelDate);
    });
  }
  deleteTravel(id: number) {
    this.travelService.deleteTravelitinerary(id);
  }
}
