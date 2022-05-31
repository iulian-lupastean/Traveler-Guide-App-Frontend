import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateTravelService {
  travelId = 0;
  travelName = '';
  locationId: number = 0;
  travelDate = new Date();
  constructor() {}

  setTravelId(travelId: number) {
    this.travelId = travelId;
  }
  getTravelId() {
    return this.travelId;
  }
  setTravelInfo(travelName: string, travelDate: Date) {
    this.travelName = travelName;
    this.travelDate = travelDate;
  }
  getTravelInfo() {
    return [this.travelName, this.travelDate];
  }

  setLocationId(locationId: number) {
    this.locationId = locationId;
  }
  getLocationId() {
    return this.locationId;
  }
}
