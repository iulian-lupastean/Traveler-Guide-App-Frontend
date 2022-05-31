import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty, map, NotFoundError, Observable } from 'rxjs';
import { ITravelItinerary } from '../Interfaces/ITravelItinerary';
import { DatePipe } from '@angular/common';
import { userId } from '../Globals';
import { ILocation } from '../Interfaces/ILocation';
import { ICity } from '../Interfaces/ICity';
import { ITravelItineraryLocation } from '../Interfaces/ITravelItineraryLocation';
import { IUserExperience } from '../Interfaces/IUserExperience';
@Injectable()
export class TravelService {
  apiGetTravelItineraries = 'https://localhost:7075/api/TravelItinerary';
  apiGetLocationsForTravelItinerary =
    'https://localhost:7075/api/TravelItineraryLocation';
  id!: number;
  errorMessage: any;
  status!: string;
  travel!: Observable<ITravelItinerary>;
  constructor(private httpClient: HttpClient) {}

  getLocationsForTravel(id: number): Observable<any> {
    return this.httpClient.get(
      `${this.apiGetLocationsForTravelItinerary}/${id}/locations`
    );
  }
  getTravelsForUser(id: number): Observable<ITravelItinerary[]> {
    return this.httpClient.get<ITravelItinerary[]>(
      `${this.apiGetTravelItineraries}/${id}`
    );
  }
  createNewTravelItinerary(name: string, date: Date) {
    this.httpClient
      .post<ITravelItinerary>('https://localhost:7075/api/TravelItinerary', {
        name: name,
        status: 'Planned',
        travelDate: date,
        userId: userId,
      })
      .subscribe({
        next: (data) => {
          this.id = data.travelId;
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
  deleteTravelitinerary(travelId: number) {
    console.log(travelId);
    this.httpClient
      .delete(`https://localhost:7075/api/TravelItinerary/${travelId}`)
      .subscribe({
        next: (data) => {
          this.status = 'Delete successful';
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
    window.location.reload();
  }
  getTravelItineraryById(travelId: number): Observable<ITravelItinerary> {
    return this.httpClient.get<ITravelItinerary>(
      `https://localhost:7075/api/TravelItinerary/Admin/${travelId}`
    );
  }
  updateTravelitinerary(travelId: number, travel: ITravelItinerary) {
    this.httpClient
      .put(`https://localhost:7075/api/TravelItinerary/${travelId}`, travel)
      .subscribe({
        next: (data) => {
          this.status = 'Delete successful';
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
  getLocationByLatLng(lat: string, lng: string): Observable<any> {
    return this.httpClient.get(
      `https://localhost:7075/api/Locations/${lat}/${lng}`
    );
  }
  getCityByNameAndCountry(cityName: string,country: string): Observable<ICity> {
    return this.httpClient.get<ICity>(
      `https://localhost:7075/api/Cities/${country}/${cityName}`
    );
  }
  createCity(cityName: string, country: string) {
    return this.httpClient.post<ICity>(
      'https://localhost:7075/api/Cities/Admin',
      {
        name: cityName,
        country: country,
      }
    );
  }
  createLocation(locName: string,locAddress: string,lat: string,lng: string,cityId: number) {
   return this.httpClient.post<ILocation>(
     'https://localhost:7075/api/Locations/Admin', {
        name: locName,
        address: locAddress,
        latitude: lat,
        longitude: lng,
        cityId: cityId,
      }
    );
  }
  addLocationToTravelItinerary(travelId: number, locationId: number) {
    this.httpClient
      .post(
        `https://localhost:7075/api/TravelItineraryLocation/${travelId}/locations/${locationId}`,
        {}
      );
  }
  createUserExperience(userId: number, travelItineraryId: number,locationId: number,priority: string, budget: number,description: string
  ) {
    this.httpClient
      .post<IUserExperience>('https://localhost:7075/api/UserExperience', {
        userId: userId,
        travelItineraryId: travelItineraryId,
        locationId: locationId,
        priority: priority,
        budget: budget,
        description: description,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
  getUserExperience(
    userId: number,
    travelItineraryId: number,
    locationId: number
  ) {
    return this.httpClient.get<IUserExperience>(
      `https://localhost:7075/api/UserExperience/${userId}/${travelItineraryId}/${locationId}`
    );
  }
}
