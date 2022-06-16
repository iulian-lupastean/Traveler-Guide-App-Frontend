import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GetInfoFromIdService } from 'src/app/services/get-info-from-id.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { IGoogleDetails } from 'src/app/Interfaces/IGoogleDetails';
import { SettingsService } from 'src/app/services/settings.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { IAddressComponents } from 'src/app/Interfaces/IAddressComponents';
import { TravelService } from 'src/app/services/travel.service';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/Interfaces/ICity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { HttpClient } from '@angular/common/http';
import { IUserExperience } from 'src/app/Interfaces/IUserExperience';
import { MatTable } from '@angular/material/table';
import { IDataSource } from 'src/app/Interfaces/IDataSource';
import { IAddLocationToTravel } from 'src/app/Interfaces/IAddLocationToTravel';
import { LocationsTableComponent } from '../locations-table/locations-table.component';
import { verifyBudget } from 'src/assets/Validators/budget-validator';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export default class CitiesComponent implements OnInit, AfterViewInit {
  title = 'angular-google-map-search';
  Name = new FormControl();
  Address = new FormControl();
  TravelName = new FormControl();
  @Output()
  sendLocationAndExperience: EventEmitter<IAddLocationToTravel> = new EventEmitter<IAddLocationToTravel>();
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
  /////////////
  @ViewChild(LocationsTableComponent) child!: any;
  ///////////
  locations: ILocation[] = [];

  frmStepTwo!: FormGroup;
  markers = [] as any;
  infoContent = '';
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDefaultUI: false,
    fullscreenControl: false,
    mapTypeControl: false,
    disableDoubleClickZoom: false,
  };
  locationName: string = '';
  latitude: any = 0;
  longitude: any = 0;
  countryName: string = '';
  locationAddress: string = '';
  locationLat: string = '';
  locationLng: string = '';
  cityName: string = '';
  googleDetails: IGoogleDetails = {
    result: {
      name: '',
      formatted_address: '',
      geometry: {
        location: {
          lat: 0,
          lng: 0,
        },
      },
      address_components: [],
    },
  };

  cityId: number = 0;
  City!: Observable<ICity>;
  travelId: number = 0;
  locationId: number = 0;
  locationPriority: string = '';
  locationBudget: string = '';
  locationDescription: string = '';
  existingPriority: string = '';
  existingBudget: string = '';
  existingDescription: string = '';
  userExperiences$!: Observable<IUserExperience>;
  selected: string = 'High';
  makerIndexSelected: any;
  AddNewLocation: IAddLocationToTravel = {
    Name: '',
    Address: '',
    Budget: 0,
    Description: '',
    Latitude: '',
    Longitude: ''
  };
  addLocationsFormGroup: any;

  constructor(private ngZone: NgZone, private _formBuilder: FormBuilder, private getInfoFromId: GetInfoFromIdService, public settingsService: SettingsService, private updateTravelService: UpdateTravelService, private travelService: TravelService, private _snackBar: MatSnackBar, private httpClient: HttpClient) { }

  ngAfterViewInit(): void {
    this.travelId = this.updateTravelService.getTravelId();
    if (this.travelId !== 0) {

      this.getLocations(this.travelId);
    }
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

        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();


        //set latitude, longitude and zoom

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
    navigator.geolocation.getCurrentPosition((position) => {

      if (this.travelId == 0) {

        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      }



    });
    this.frmStepTwo = this._formBuilder.group({
      locationNameCtrl: ['', Validators.required],
      locationAddressCtrl: ['', Validators.required],
      locationPriorityCtrl: ['', Validators.required],
      locationBudgetCtrl: [0, verifyBudget(0)],
      locationDescription: ['']
    })
  }
  async setLatest(travelId: number) {
    if (travelId == 0) {
      await this.travelService.getTravelsForUser(Number(localStorage.getItem("userId"))).toPromise().then((data: any) => {
        this.travelId = data[data.length - 1].travelId;
      });
      this.updateTravelService.setTravelId(this.travelId);
    }
  }
  handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
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
      await this.checkForLocation(this.locationName, this.locationAddress, this.locationLat, this.locationLng, this.cityId);
      this.updateTravelService.setLocationId(this.locationId)
    });
  }

  async SaveLocation() {
    if (this.travelId == 0) {
      await this.setLatest(this.travelId)

    }
    this.travelService.addLocationToTravelItinerary(this.travelId, this.locationId);
    this.travelService.createUserExperience(Number(localStorage.getItem("userId")), this.travelId, this.locationId, this.locationPriority, Number(this.locationBudget), this.locationDescription);
    this._snackBar.open('Location Added Successfully!', 'Continue', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['SnackBar'],
      duration: 3000
    });
    const marker = new google.maps.Marker({
      position: {
        lat: Number(this.locationLat),
        lng: Number(this.locationLng)
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `${this.locationName}#${this.locationAddress}#${this.locationBudget}#${this.locationDescription}`
    });
    const index = this.markers.length;
    this.markers.push({ index, marker, infoWindow });
    this.AddNewLocation = {
      Name: this.locationName,
      Address: this.locationAddress,
      Budget: Number(this.locationBudget),
      Description: this.locationDescription,
      Latitude: this.locationLat,
      Longitude: this.locationLng
    }
    this.child?.addListItem({
      Name: this.locationName,
      Address: this.locationAddress,
      Budget: Number(this.locationBudget),
      Description: this.locationDescription,
      Latitude: this.locationLat,
      Longitude: this.locationLng
    });
    this.resetFields();
  }


  async checkForCity(cityName: string, country: string) {

    await this.travelService.getCityByNameAndCountry(cityName, country).toPromise().then(data => {
      this.cityId = data!.id;
    }
    ).catch(async error => {
      await this.travelService.createCity(cityName, country).toPromise().then((data: any) => {
        this.cityId = data!.id;
      })
    });
  }
  async checkForLocation(name: string, address: string, lat: string, lng: string, cityId: number) {

    await this.travelService.getLocationByLatLng(lat, lng).toPromise().then(data => {
      this.locationId = data.locationId;
    }).catch(async error => {
      await this.travelService.createLocation(name, address, lat, lng, cityId).toPromise().then(
        (data: any) => {
          this.locationId = data.locationId;
        }
      )
    })

  }

  getLocations(travelId: number) {
    this.httpClient.get<ILocation[]>(
      `api/TravelItineraryLocation/${travelId}/locations`)
      .subscribe(
        (response) => {
          this.locations = response;
          if (this.travelId != 0) {

            this.center = {
              lat: Number(this.locations[0].latitude),
              lng: Number(this.locations[0].longitude),
            };
          }


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
      .getUserExperience(Number(localStorage.getItem("userId")), this.travelId, location.locationId)
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


  centerMap(latLng: any) {
    this.zoom = 0;
    this.center = {
      lat: Number(latLng.latitude),
      lng: Number(latLng.longitude),
    };

    this.zoom = 15;
  }

  deleteLocation(index: number) {
    this.markers = [];
    this.getLocations(this.travelId);
    this.placeAllMarkers(this.locations);

  }
}
