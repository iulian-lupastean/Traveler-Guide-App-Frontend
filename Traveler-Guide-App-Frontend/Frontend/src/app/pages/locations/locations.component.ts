import { Component, OnInit, ViewChild } from '@angular/core';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { HttpClient } from '@angular/common/http';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  constructor(private http: HttpClient) {}
  locations: ILocation[] = [];
  markers = [] as any;
  infoContent = '';
  selected: string = 'Museum';

  locationsViewModel: FormGroup = new FormGroup({});

  ngOnInit() {
    this.getLocations();
    this.locationsViewModel = new FormGroup({
      name: new FormControl(Validators.required),
      address: new FormControl([Validators.required, Validators.minLength(10)]),
      type: new FormControl(),
      price: new FormControl(),
      latitude: new FormControl({ disabled: true }),
      longitude: new FormControl({ disabled: true }),
    });
  }

  getLocations() {
    this.http
      .get<ILocation[]>('https://localhost:7075/api/Locations')
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
      const infoWindow = new google.maps.InfoWindow({
        content: this.getContentString(location),
      });
      return { marker, infoWindow };
    });
    return markers;
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content.content;
    this.infoWindow.open(marker);
  }
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    center: { lat: 40.416775, lng: -3.70379 },
    zoom: 13,
  };
  getContentString(location: ILocation) {
    return `${location.name}#${location.address}#${location.locationType}#${location.price}$`;
  }
  onSave() {}
}
