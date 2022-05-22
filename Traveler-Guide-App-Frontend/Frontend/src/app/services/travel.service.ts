import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITravelItinerary } from '../Interfaces/ITravelItinerary';
import { DatePipe } from '@angular/common';

@Injectable()
export class TravelService {
  apiGetTravelItineraries = 'https://localhost:7075/api/TravelItinerary';
  apiGetLocationsForTravelItinerary =
    'https://localhost:7075/api/TravelItineraryLocation';
  id!: number;
  errorMessage: any;
  status!: string;
  constructor(private httpClient: HttpClient, public datepipe: DatePipe) {}

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
        userId: 2,
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
}
