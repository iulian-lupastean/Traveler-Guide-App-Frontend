import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
import { TravelService } from 'src/app/services/travel-service';

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.css'],
})
export class ViewTravelComponent implements OnInit {
  @Input()
  uniqueTravel!: ITravelItinerary;
  locations!: Observable<ILocation[]>;
  constructor(private travelService: TravelService) {}

  ngOnInit() {}
  getLocations(id: number) {
    console.log(id);
    this.locations = this.travelService.getLocationsForTravel(id);
  }
  deleteTravel(id: number) {}
}
