import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  startLocation: any;
  dataToDisplay: any[] = [];
  locations!: Observable<ILocation[]>;
  coord!: LatLng
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
        zoom: 6,
        center: { lat: 41.85, lng: -87.65 },
      }
    );

    directionsRenderer.setMap(map);

    (document.getElementById("submit") as HTMLElement).addEventListener(
      "click",
      () => {
        this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      }
    );
  }
  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const waypts: google.maps.DirectionsWaypoint[] = [];
    const checkboxArray = document.getElementById(
      "waypoints"
    ) as HTMLSelectElement;

    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: (checkboxArray[i] as HTMLOptionElement).value,
          stopover: true,
        });
      }
    }

    var selectedMode = (document.getElementById("mode") as HTMLInputElement).value;
    console.log(selectedMode);
    console.log(this.travelMode);


    directionsService
      .route({
        origin: (document.getElementById("start") as HTMLInputElement).value,
        destination: (document.getElementById("end") as HTMLInputElement).value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: this.travelMode,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        const route = response.routes[0];
        const summaryPanel = document.getElementById(
          "directions-panel"
        ) as HTMLElement;

        summaryPanel.innerHTML = "";

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;

          summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML += route.legs[i].distance!.text + "<br><br>";
        }
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }



}
