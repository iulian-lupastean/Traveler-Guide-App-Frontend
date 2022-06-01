import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
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
import { MatTable } from '@angular/material/table';
import { IDataSource } from 'src/app/Interfaces/IDataSource';

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
  @Input()
  travelName!: string;
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;
  @ViewChild('prioritySelect') prioritySelect: any;
  @ViewChild(MatTable) table!: MatTable<IDataSource>;
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
    disableDoubleClickZoom: false,
  };
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
  selected: string = 'High';
  makerIndexSelected: any;

  constructor(private ngZone: NgZone, private getInfoFromId: GetInfoFromIdService, public settingsService: SettingsService, private updateTravelService: UpdateTravelService, private travelService: TravelService, private _snackBar: MatSnackBar, private httpClient: HttpClient) { }

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
  deleteMarker() {
    delete this.markers[this.makerIndexSelected];
  }

  ngOnInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.setLatest(this.travelId);
    this.updateTravelService.setTravelId;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.resetFields();
  }
  setLatest(travelId: number) {
    if (travelId == 0) {
      this.travelService.getTravelsForUser(userId).subscribe((data) => {
        this.travelId = data[data.length - 1].travelId;
      });
    }
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
  async getPlaceInformation(placeId: string) {
    this.getInfoFromId.getInfoFromID(placeId).subscribe(async (data) => {
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

      this.locationLat = String(
        this.googleDetails.result.geometry.location.lat
      );
      this.locationLng = String(
        this.googleDetails.result.geometry.location.lng
      );
      this.Name.setValue(this.googleDetails.result.name);
      this.Address.setValue(this.googleDetails.result.formatted_address);
      await this.checkForCity(this.cityName, this.countryName);
      console.log(this.cityId)
      await this.checkForLocation(this.locationName, this.locationAddress, this.locationLat, this.locationLng, this.cityId);
      console.log(this.locationId)
      this.updateTravelService.setLocationId(this.locationId)
    });
  }

  SaveLocation() {
    console.log(this.locationId);
    console.log(this.travelId);
    this.travelService.addLocationToTravelItinerary(this.travelId, this.locationId);
    this.travelService.createUserExperience(userId, this.travelId, this.locationId, this.locationPriority, Number(this.locationBudget), this.locationDescription);
    this._snackBar.open('Location Added Successfully!', 'Continue', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['SnackBar'],
    });
  }
  async checkForCity(cityName: string, country: string) {

    await this.travelService.getCityByNameAndCountry(cityName, country).toPromise().then(data => {
      this.cityId = data!.id;
      console.log(data);
    }
    ).catch(async error => {
      await this.travelService.createCity(cityName, country).toPromise().then((data: any) => {
        console.log(data);
        this.cityId = data!.id;
        console.log(data!.id);
      })
      console.log("checkForCity");
    });

    // .subscribe({
    //   next: (data) => {
    //     
    //     //  console.log(data.id);
    //     console.log("Next");
    //   },
    //   error: async (error) => {
    //     (await this.travelService.createCity(cityName, country)).subscribe(
    //       (data: any) => {

    //         let id = this.travelService.getCityByNameAndCountry(cityName, country).subscribe((result) => {
    //           this.cityId = result.id;
    //           return result.id;
    //         }

    //         );
    //         console.log("Error");
    //         console.log(id);

    //       });
    //     console.error('There was an error!', error);

    //   },
    // });
  }
  async checkForLocation(name: string, address: string, lat: string, lng: string, cityId: number) {

    await this.travelService.getLocationByLatLng(lat, lng).toPromise().then(data => {
      this.locationId = data.locationId;
    }).catch(async error => {
      await this.travelService.createLocation(name, address, lat, lng, cityId).toPromise().then(
        (data: any) => {
          this.locationId = data.locationId;
          console.log(data);
        }
      )
      console.log("checkForLocation");
    })

    // this.travelService.getLocationByLatLng(lat, lng).subscribe({
    //   next: (data) => {
    //     this.locationId = data.locationId;
    //   },
    //   error: async (error) => {
    //     (await this.travelService.createLocation(name, address, lat, lng, cityId)).subscribe(
    //       (data: any) => {
    //         this.travelService.getLocationByLatLng(lat, lng).subscribe(
    //           (result) => {
    //             this.locationId = result.locationId;
    //           }
    //         )
    //       });
    //     console.error('There was an error!', error);
    //   },
    // });
  }

  getLocations(travelId: number) {
    this.httpClient.get<ILocation[]>(
      `https://localhost:7075/api/TravelItineraryLocation/${travelId}/locations`)
      .subscribe(
        (response) => {
          this.locations = response;
          this.markers = this.placeAllMarkers(this.locations);
        },
        (error) => console.log(error)
      );
  } changeClient(value: any) {
    this.locationPriority = value;
  }
  placeAllMarkers(locations: ILocation[]) {
    var markers = locations.map((location, index) => {
      const marker = new google.maps.Marker({
        position: {
          lat: Number(location.latitude),
          lng: Number(location.longitude),
        },
      });
      const infoWindow = new google.maps.InfoWindow({
        content: this.getContentString(location),
      });
      return { index, marker, infoWindow };
    });
    return markers;
  }

  openInfo(marker: MapMarker, content: any, index: any) {
    this.infoContent = content.content;
    this.makerIndexSelected = index;
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
    return `${location.name}#${location.address}#${this.existingBudget}#${this.existingDescription}`;
  }
  resetFields() {
    this.locationName = '';
    this.locationAddress = '';
    this.locationBudget = '0';
    this.locationDescription = '';
    this.selected = 'High';
  }
  goBackToCreateUpdateTravel() {
    this.updateTravelService.setTravelId(this.travelId);
  }
}
