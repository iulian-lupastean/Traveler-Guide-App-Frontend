import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LatLng, LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { Observable, ReplaySubject } from 'rxjs';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { TravelService } from 'src/app/services/travel.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
interface TravelModeOption {
  name: string,
  travelMode: google.maps.TravelMode
}
@Component({
  selector: 'app-locations-directions',
  templateUrl: './locations-directions.component.html',
  styleUrls: ['./locations-directions.component.css']
})
export class LocationsDirectionsComponent implements OnInit, AfterViewInit {
  travelModes: TravelModeOption[] = [{ name: "Driving", travelMode: google.maps.TravelMode.DRIVING }, { name: "Walking", travelMode: google.maps.TravelMode.WALKING },
  { name: "Bicycling", travelMode: google.maps.TravelMode.BICYCLING }, { name: "Public Transport", travelMode: google.maps.TravelMode.TRANSIT }]
  travelMode: google.maps.TravelMode = google.maps.TravelMode.TRANSIT;
  travelId: number = 0;
  dataToDisplay: any[] = [];
  locations!: Observable<ILocation[]>;
  coord!: LatLng
  startLocation!: string;
  endLocation!: string;
  waypts: google.maps.DirectionsWaypoint[] = [];
  newwaypoints: google.maps.DirectionsWaypoint[] = [];
  wayptsForm = new FormControl();
  constructor(private travelService: TravelService, private updateTravelService: UpdateTravelService) { }
  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.locations = this.travelService.getLocationsForTravel(this.travelId)
  }

  initMap(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 3,
        center: { lat: 40.416775, lng: -3.703790 },
      }
    );

    directionsRenderer.setMap(map);

    (document.getElementById("submit") as HTMLElement).addEventListener(
      "click",
      () => {
        this.calculateAndDisplayRoute(directionsService, directionsRenderer);
        this.newwaypoints = [];
      }
    );
  }



  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    for (let i = 0; i < this.waypts.length; i++) {
      this.newwaypoints.push({
        location: String(this.waypts[i]),
        stopover: true
      })
    }



    directionsService
      .route({
        origin: this.startLocation,
        destination: this.endLocation,
        waypoints: this.newwaypoints,
        optimizeWaypoints: true,
        travelMode: this.travelMode,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => console.log(e));
  }



}
