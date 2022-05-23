import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateTravelService {
  travelId = 0;
  travelName = '';
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

    console.log(this.travelName, this.travelDate);
  }
  setTravelInfo() {
    console.log(this.travelName, this.travelDate);
    return [this.travelName, this.travelDate];
  }
}
