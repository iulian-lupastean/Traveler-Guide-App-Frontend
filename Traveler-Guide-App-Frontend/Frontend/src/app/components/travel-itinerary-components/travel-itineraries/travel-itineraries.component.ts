import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
import { TravelService } from 'src/app/services/travel-service';
import { SearchService } from 'src/app/services/search-service';
@Component({
  selector: 'app-travel-itineraries',
  templateUrl: './travel-itineraries.component.html',
  styleUrls: ['./travel-itineraries.component.css'],
})
export class TravelItinerariesComponent
  implements OnInit, OnDestroy, OnChanges
{
  unsubscribe: Subject<void> = new Subject<void>();
  travelItineraries!: Observable<ITravelItinerary[]>;
  locations!: Observable<ILocation[]>;
  searchText!: string;
  filterargs = { name: '' };
  constructor(
    private travelService: TravelService,
    private searchService: SearchService
  ) {}
  ngOnInit() {
    this.travelItineraries = this.travelService.getTravelsForUser(2);
    this.searchService.searchStringChanged$.subscribe(
      (x) => (this.filterargs.name = x)
    );
  }
  ngOnChanges() {}
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  getLocations(id: number) {
    console.log(id);
    this.locations = this.travelService.getLocationsForTravel(id);
  }
  deleteTravel(id: number) {}
}
