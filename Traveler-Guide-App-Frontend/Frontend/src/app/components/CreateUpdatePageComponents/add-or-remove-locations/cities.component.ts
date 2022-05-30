import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetInfoFromIdService } from 'src/app/services/get-info-from-id.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { IGoogleDetails } from 'src/app/Interfaces/IGoogleDetails';
import { SettingsService } from 'src/app/services/settings.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { IAddressComponents } from 'src/app/Interfaces/IAddressComponents';
import { TravelService } from 'src/app/services/travel.service';
import { isEmpty, map, Observable } from 'rxjs';
import { ICity } from 'src/app/Interfaces/ICity';
import { userId } from 'src/app/Globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { HttpClient } from '@angular/common/http';
import { IUserExperience } from 'src/app/Interfaces/IUserExperience';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export default class CitiesComponent implements OnInit {
  title = 'angular-google-map-search';
  Name = new FormControl();
  Address = new FormControl();
  TravelName = new FormControl();
  test1 = new FormControl();
  test2 = new FormControl();
  test3 = new FormControl();
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;
  locations: ILocation[] = [];
  markers = [] as any;
  infoContent = '';
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDefaultUI: false,
    fullscreenControl: false,
    mapTypeControl: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
  };
  travelName!: string;
  locationName!: string;
  latitude!: any;
  longitude!: any;
  countryName!: string;
  locationAddress!: string;
  locationLat!: string;
  locationLng!: string;
  cityName!: string;
  googleDetails!: IGoogleDetails;
  existingCity!: ICity;
  cityId!: number;
  City!: Observable<ICity>;
  travelId!: number;
  locationId!: number;
  locationPriority!: string;
  locationBudget!: string;
  locationDescription: string = '';
  existingPriority!: string;
  existingBudget!: string;
  existingDescription!: string;
  userExperiences$!: Observable<IUserExperience>;
  constructor(
    private ngZone: NgZone,
    private getInfoFromId: GetInfoFromIdService,
    public settingsService: SettingsService,
    private updateTravelService: UpdateTravelService,
    private travelService: TravelService,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {}

  ngAfterViewInit(): void {
    this.getLocations(this.travelId);
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
    this.travelId = this.updateTravelService.setSearchString();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    var info = this.updateTravelService.setTravelInfo();

    this.travelName = info[0] as string;
  }
  handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log(event);
    if (this.isIconMouseEvent(event)) {
      event.stop();
      if (event.placeId) {
        this.getPlaceInformation(event.placeId);
      }
    }
  }
  isIconMouseEvent(
    e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ): e is google.maps.IconMouseEvent {
    return 'placeId' in e;
  }
  getPlaceInformation(placeId: string) {
    this.getInfoFromId.getInfoFromID(placeId).subscribe((data) => {
      this.googleDetails = data as IGoogleDetails;
      var cityName: IAddressComponents[] =
        this.googleDetails.result.address_components.filter(
          (data) => data.types[0] == 'locality'
        );
      this.cityName = cityName[0].long_name;
      var countryName: IAddressComponents[] =
        this.googleDetails.result.address_components.filter(
          (data) => data.types[0] == 'country'
        );
      this.countryName = countryName[0].long_name;
      // console.log(this.googleDetails.result.geometry.location.lat);

      this.locationLat = String(
        this.googleDetails.result.geometry.location.lat
      );
      this.locationLng = String(
        this.googleDetails.result.geometry.location.lng
      );
      this.Name.setValue(this.googleDetails.result.name);
      this.Address.setValue(this.googleDetails.result.formatted_address);

      this.checkForCity(this.cityName, this.countryName);

      this.travelService
        .getLocationByLatLng(this.locationLat, this.locationLng)
        .subscribe({
          next: (data) => {
            this.locationId = data.locationId;
            this.updateTravelService.getLocationId(data.locationId);
            console.log(this.locationId);
          },
        });
    });
  }
  changeClient(value: any) {
    this.locationPriority = value;
  }
  SaveLocation() {
    this.locationId = this.updateTravelService.setLocationId();
    console.log(this.locationId);
    this.addLocationToTravel(this.travelId, this.locationId);
    console.log(this.locationId);
    console.log(this.locationAddress);
    console.log(this.locationPriority);
    console.log(this.locationBudget);
    this.addUserExperience(
      userId,
      this.travelId,
      this.locationId,
      this.locationPriority,
      Number(this.locationBudget),
      this.locationDescription
    );
    this._snackBar.open('Location Added Successfully!', 'Continue', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['SnackBar'],
    });
  }
  async checkForCity(cityName: string, country: string) {
    this.travelService.getCityByNameAndCountry(cityName, country).subscribe({
      next: (data) => {
        this.cityId = data.id;
        this.checkForLocation(
          this.locationName,
          this.locationAddress,
          this.locationLat,
          this.locationLng,
          this.cityId
        );
      },

      error: (error) => {
        this.travelService.createCity(cityName, country).subscribe({
          next: (data: any) => {
            this.travelService
              .getCityByNameAndCountry(cityName, country)
              .subscribe((result) => {
                this.cityId = result.id;
                console.log(this.cityId);
                this.checkForLocation(
                  this.locationName,
                  this.locationAddress,
                  this.locationLat,
                  this.locationLng,
                  this.cityId
                );
              });
          },
        });
        console.error('There was an error!', error);
      },
    });
  }
  async checkForLocation(
    name: string,
    address: string,
    lat: string,
    lng: string,
    cityId: number
  ) {
    this.travelService.getLocationByLatLng(lat, lng).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        this.travelService.createLocation(name, address, lat, lng, cityId);
        console.error('There was an error!', error);
      },
    });
  }
  addLocationToTravel(travelId: number, locationId: number) {
    this.travelService.addLocationToTravelItinerary(travelId, locationId);
  }
  addUserExperience(
    userId: number,
    travelItineraryId: number,
    locationId: number,
    priority: string,
    budget: number,
    description: string
  ) {
    this.travelService.createUserExperience(
      userId,
      travelItineraryId,
      locationId,
      priority,
      budget,
      description
    );
  }
  getLocations(travelId: number) {
    this.httpClient
      .get<ILocation[]>(
        `https://localhost:7075/api/TravelItineraryLocation/${travelId}/locations`
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

  getContentString(location: ILocation) {
    this.travelService
      .getUserExperience(userId, this.travelId, location.locationId)
      .subscribe({
        next: (data) => {
          this.existingBudget = String(data.budget);
          this.existingDescription = data.description;
        },
      });

    var userExp!: IUserExperience;
    return `${location.name}#${location.address}#${this.existingBudget}#${this.existingDescription}`;
  }
}
