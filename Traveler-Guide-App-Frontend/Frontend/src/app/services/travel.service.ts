import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITravelItinerary } from '../Interfaces/ITravelItinerary';
import { ILocation } from '../Interfaces/ILocation';
import { ICity } from '../Interfaces/ICity';
import { ITravelItineraryLocation } from '../Interfaces/ITravelItineraryLocation';
import { IUserExperience } from '../Interfaces/IUserExperience';
@Injectable()
export class TravelService {
  apiGetTravelItineraries = 'api/TravelItinerary';
  apiGetLocationsForTravelItinerary =
    'api/TravelItineraryLocation';
  id!: number;
  errorMessage: any;
  status!: string;
  travel!: Observable<ITravelItinerary>;
  constructor(private httpClient: HttpClient) { }

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
  async createNewTravelItinerary(name: string, date: Date) {
    var id;
    await this.httpClient
      .post<ITravelItinerary>('api/TravelItinerary', {
        name: name,
        status: 'Planned',
        travelDate: date,
        userId: Number(localStorage.getItem("userId")),
      })
      .toPromise().then(
        data => {
          id = data?.travelId;
        }
      );
  }
  deleteTravelitinerary(travelId: number) {
    this.httpClient
      .delete(`api/TravelItinerary/${travelId}`)
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
      `api/TravelItinerary/Admin/${travelId}`
    );
  }
  updateTravelitinerary(travelId: number, travel: ITravelItinerary) {
    this.httpClient
      .put(`api/TravelItinerary/${travelId}`, travel)
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
      `api/Locations/${lat}/${lng}`
    );
  }
  getCityByNameAndCountry(cityName: string, country: string): Observable<ICity> {
    return this.httpClient.get<ICity>(
      `api/Cities/${country}/${cityName}`
    );
  }
  createCity(cityName: string, country: string) {
    return this.httpClient.post<ICity>(
      'api/Cities/Admin',
      {
        name: cityName,
        country: country,
      }
    );
  }
  createLocation(locName: string, locAddress: string, lat: string, lng: string, cityId: number) {
    return this.httpClient.post<ILocation>(
      'api/Locations/Admin', {
      name: locName,
      address: locAddress,
      latitude: lat,
      longitude: lng,
      cityId: cityId,
    }
    );
  }
  async addLocationToTravelItinerary(travelId: number, locationId: number) {
    await this.httpClient
      .post<ITravelItineraryLocation>(
        'api/TravelItineraryLocation',
        {
          TravelItineraryId: travelId,
          LocationId: locationId,
        }).toPromise().then(data => {

        })
  }
  async createUserExperience(userId: number, travelItineraryId: number, locationId: number, priority: string, budget: number, description: string) {
    await this.httpClient
      .post<IUserExperience>('api/UserExperience', {
        userId: userId,
        travelItineraryId: travelItineraryId,
        locationId: locationId,
        priority: priority,
        budget: budget,
        description: description,
      }).toPromise().then(data => {

      }).catch(error => { });
  }
  getUserExperience(
    userId: number,
    travelItineraryId: number,
    locationId: number
  ) {
    return this.httpClient.get<IUserExperience>(
      `api/UserExperience/${userId}/${travelItineraryId}/${locationId}`
    );
  }
  deleteLocationFromTravelItinerary(travelId: number, locationId: number) {
    return this.httpClient.delete(`api/TravelItineraryLocation/${travelId}/locations/${locationId}`);
  }
  deleteUserExperience(userId: number, travelId: number, locationId: number) {
    return this.httpClient.delete(`api/UserExperience/${userId}/${travelId}/${locationId}`);
  }
  updateUserexperience(userId: number, travelId: number, locationId: number, userExp: IUserExperience) {
    return this.httpClient.put(`api/UserExperience/${userId}/${travelId}/${locationId}`, userExp);
  }
  getBudget(userId: number, travelId: number) {
    return this.httpClient.get(`https://localhost:7075/UserExperience/${userId}/${travelId}`);
  }
}
