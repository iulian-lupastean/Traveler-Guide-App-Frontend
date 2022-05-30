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
  getTravelId(travelId: number) {
    this.travelId = travelId;
  }
  setSearchString() {
    return this.travelId;
  }
  getTravelInfo(travelName: string, travelDate: Date) {
    this.travelName = travelName;
    this.travelDate = travelDate;
  }
  setTravelInfo() {
    return [this.travelName, this.travelDate];
  }
  getLocationId(locationId: number) {
    this.locationId = locationId;
  }
  setLocationId() {
    return this.locationId;
  }
}
