import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetInfoFromIdService {
  firstPart =
    'google/maps/api/place/details/json?place_id=';
  secondPart = '&key=AIzaSyD_gPsipPHYssznDenQ8nwM4djj9y88yrk';
  constructor(private httpClient: HttpClient) { }
  getInfoFromID(id: string) {
    return this.httpClient.get(this.firstPart + id + this.secondPart);
  }
}
