import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GetInfoFromIdService {
  firstPart = 'maps/api/place/details/json?place_id=';
  secondPart =
    '&fields=name%2Crating%2Cformatted_phone_number&key=AIzaSyD_gPsipPHYssznDenQ8nwM4djj9y88yrk&locations=places';
  constructor(private httpClient: HttpClient) {}
  getInfoFromID(id: string) {
    return this.httpClient.get(
      '/apilocation/maps/api/place/details/json?place_id=ChIJxwwzzQ8MSUcRMNV9JNnV45I&fields=name%2Crating%2Cformatted_phone_number&key=AIzaSyD_gPsipPHYssznDenQ8nwM4djj9y88yrk'
    );
  }
}
