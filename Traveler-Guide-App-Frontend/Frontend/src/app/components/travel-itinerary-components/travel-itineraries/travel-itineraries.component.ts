import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
import { TravelService } from 'src/app/services/travel-service';
@Component({
  selector: 'app-travel-itineraries',
  templateUrl: './travel-itineraries.component.html',
  styleUrls: ['./travel-itineraries.component.css'],
})
export class TravelItinerariesComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject<void>();
  constructor(private travelService: TravelService) {}
  importedData: any;
  travelItineraries: any;
  panelOpenState: boolean = false;
  ngOnInit() {
    this.importedData = this.travelService.getTravelsForUser(2).subscribe;
    this.travelItineraries = this.importedData.subscribe((x: any) =>
      console.log(x)
    );
    console.log(this.travelItineraries);
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
