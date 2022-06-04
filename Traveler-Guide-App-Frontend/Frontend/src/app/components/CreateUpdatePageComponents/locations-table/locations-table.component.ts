import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TravelService } from 'src/app/services/travel.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { userId } from 'src/app/Globals';
import { MatTable } from '@angular/material/table';
import { IDataSource } from 'src/app/Interfaces/IDataSource';
import { IAddLocationToTravel } from 'src/app/Interfaces/IAddLocationToTravel';
@Component({
  selector: 'app-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.css'],
})
export class LocationsTableComponent implements OnInit {
  @Output("centerMap") centerMap: EventEmitter<any> = new EventEmitter();
  @Output("deleteLocation") deleteLocation: EventEmitter<any> = new EventEmitter();
  dataSource!: any[];
  displayedColumns: string[] = [
    'name',
    'address',
    'budget',
    'description',
    'actions',
  ];
  @Input() locationAndUser: IAddLocationToTravel = {
    Name: '',
    Address: '',
    Budget: 0,
    Description: '',
    Latitude: '',
    Longitude: ''
  };
  @ViewChild(MatTable) table!: MatTable<IDataSource>;
  travelId: number = 0;
  locationId: number = 0;
  constructor(
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService
  ) { }


  ngOnInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.getLocationsTable(this.travelId);
  }
  getLocationsTable(travelId: number) {
    const ar: any = [];
    this.travelService.getLocationsForTravel(travelId).subscribe((data) => {
      data.forEach((element: any, index: any) => {
        this.travelService
          .getUserExperience(userId, travelId, element.locationId)
          .subscribe({
            next: (result) => {
              ar.push({
                index: index,
                name: element.name,
                address: element.address,
                budget: result.budget,
                description: result.description,
                latitude: element.latitude,
                longitude: element.longitude
              });
              this.dataSource = ar;
              this.table.renderRows();
            },
            error: (error) => {
              ar.push({
                name: element.name,
                address: element.address,
                budget: 0,
                description: '',
                latitude: '',
                longitude: ''
              });
              this.dataSource = ar;
              this.table.renderRows();
            },
          });
      });
    });

    this.dataSource = ar;
    console.log(this.dataSource);

    this.table.renderRows();
  }

  addListItem(item: IAddLocationToTravel) {
    console.log(item);
    const newL: any = {
      index: this.dataSource.length,
      name: item.Name,
      address: item.Address,
      budget: item.Budget,
      description: item.Description,
      latitude: item.Latitude,
      longitude: item.Longitude
    }
    this.dataSource.push(newL)
    this.table.renderRows();
  }

  viewLocation(index: any) {
    this.centerMap.emit({ latitude: this.dataSource[index].latitude, longitude: this.dataSource[index].longitude });
  }
  async deleteLocationFromTI(parameter: any) {
    const index = this.dataSource.findIndex(date => parameter == date.index);
    await this.travelService.getLocationByLatLng(this.dataSource[index].latitude, this.dataSource[index].longitude).toPromise().then(async result => {
      console.log(result);
      await this.travelService.deleteLocationFromTravelItinerary(this.travelId, result.locationId).toPromise().then(
        (data: any) => {
          // console.log("Delete");
          // console.log(data);
          this.deleteLocation.emit(parameter);
        });
      await this.travelService.deleteUserExperience(userId, this.travelId, result.locationId).toPromise().then((data: any) => { });

    })
    this.getLocationsTable(this.travelId);

  }
  async updateLocationInTI(parameter: any) {
    alert("To be Implemented")
  }

}
