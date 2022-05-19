import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GetInfoFromIdService } from 'src/app/services/get-info-from-id.service';
import { GoogleMap } from '@angular/google-maps';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  title = 'angular-google-map-search';

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  locationsViewModel: FormGroup = new FormGroup({});
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
  };
  Address!: string;
  latitude!: any;
  longitude!: any;
  constructor(
    private ngZone: NgZone,
    private getInfoFromId: GetInfoFromIdService
  ) {}

  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      //get the place result

      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      this.ngZone.run(() => {
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }
  handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log(event);
    if (this.isIconMouseEvent(event)) {
      console.log(event.placeId);
      event.stop();
      if (event.placeId) {
        this.getPlaceInformation(event.placeId);
      }
    }
  }

  onSave() {}

  isIconMouseEvent(
    e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ): e is google.maps.IconMouseEvent {
    return 'placeId' in e;
  }
  getPlaceInformation(placeId: string) {
    console.log(placeId);
    this.getInfoFromId.getInfoFromID(placeId).subscribe((data) => {
      console.log(data);
    });
  }
}
