import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ICity } from '../../Interfaces/ICity';
import { ILocation } from '../../Interfaces/ILocation';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  cities: ICity[] = [];
  locations: ILocation[] = [];
  markers = [] as any;
  selectedCity: string = '';

  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.http.get<ICity[]>('https://localhost:7075/api/Cities').subscribe(
      (response) => {
        this.cities = response;
        console.log(this.cities);
      },
      (error) => console.log(error)
    );
  }

  getLocationsForCity(city: ICity) {
    this.http
      .get<ILocation[]>(
        `https://localhost:7075/api/Locations/${city.id}/Locations`
      )
      .subscribe(
        (response) => {
          this.locations = response;
          this.markers = this.placeAllMarkers(this.locations);
        },
        (error) => console.log(error)
      );
  }

  placeAllMarkers(locations: ILocation[]) {
    var markers = locations.map((location) => {
      const marker = new google.maps.Marker({
        position: {
          lat: Number(location.latitude),
          lng: Number(location.longitude),
        },
      });
      marker.addListener('click', () => {
        console.log('da');
      });

      return marker;
    });
    return markers;
  }
  openInfo(marker: MapMarker, content: any) {
    this.infoWindow.open(marker);
  }
  onCityChange(value: any) {
    let oras = <ICity>this.getCityByName(this.selectedCity);
    this.centerMapOnCity(oras.name);
    this.getLocationsForCity(oras);
  }

  getCityByName(city: string) {
    var valoare = this.cities.find((element) => element.name === city);
    return valoare;
  }
  centerMapOnCity(cityName: string) {
    if (cityName === 'Madrid') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 40.416775, lng: -3.70379 },
      };
    } else if (cityName === 'Paris') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 48.864716, lng: 2.349014 },
      };
    } else if (cityName === 'London') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 51.509865, lng: -0.118092 },
      };
    } else if (cityName === 'Bucuresti') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 44.439663, lng: 26.096306 },
      };
    } else if (cityName === 'New York') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 40.73061, lng: -73.935242 },
      };
    } else if (cityName === 'Berlin') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 52.520008, lng: 13.404954 },
      };
    } else if (cityName === 'Los Angeles') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 34.052235, lng: -118.243683 },
      };
    } else if (cityName === 'Prague') {
      this.mapOptions = {
        zoom: 3,
        center: { lat: 50.073658, lng: 14.41854 },
      };
    }
  }

  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    center: { lat: 40.416775, lng: -3.70379 },
    zoom: 13,
  };
}
