import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITravelItinerary } from '../Interfaces/ITravelItinerary';

@Injectable()
export class TravelService {
  apiGetTravelItineraries = 'https://localhost:7075/api/TravelItinerary';
  apiGetLocationsForTravelItinerary =
    'https://localhost:7075/api/TravelItineraryLocation';
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
}
