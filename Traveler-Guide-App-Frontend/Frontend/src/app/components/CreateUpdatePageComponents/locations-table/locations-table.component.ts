import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TravelService } from 'src/app/services/travel.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { MatTable } from '@angular/material/table';
import { IDataSource } from 'src/app/Interfaces/IDataSource';
import { IAddLocationToTravel } from 'src/app/Interfaces/IAddLocationToTravel';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.css'],
})
export class LocationsTableComponent implements OnInit, AfterViewInit {
  @Output("centerMap") centerMap: EventEmitter<any> = new EventEmitter();
  @Output("deleteLocation") deleteLocation: EventEmitter<any> = new EventEmitter();
  dataToDisplay: any[] = [];
  dataSource = new ExampleDataSource([]);
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
  table: MatTable<IDataSource> = {} as MatTable<IDataSource>;
  travelId: number = 0;
  locationId: number = 0;
  constructor(
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService,
  ) { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.getLocationsTable(this.travelId);

  }
  getLocationsTable(travelId: number) {
    this.dataToDisplay = [];
    if (travelId !== 0) {
      this.travelService.getLocationsForTravel(travelId).subscribe((data) => {
        data.forEach((element: any, index: any) => {
          this.travelService
            .getUserExperience(Number(localStorage.getItem("userId")), travelId, element.locationId)
            .subscribe({
              next: (result) => {
                const ar = {
                  index: index,
                  name: element.name,
                  address: element.address,
                  budget: result.budget,
                  description: result.description,
                  latitude: element.latitude,
                  longitude: element.longitude
                };
                this.dataToDisplay = [...this.dataToDisplay, ar];
                this.dataSource.setData(this.dataToDisplay);
                //  this.table?.renderRows();
              },
              error: (error) => {
                const ar = {
                  name: element.name,
                  address: element.address,
                  budget: 0,
                  description: '',
                  latitude: '',
                  longitude: ''
                };
                this.dataToDisplay = [...this.dataToDisplay, ar];
                this.dataSource.setData(this.dataToDisplay);
                // this.table?.renderRows();
              },
            });
        });
      });
    }


  }



  addListItem(item: IAddLocationToTravel) {
    const newL: any = {
      index: this.dataToDisplay.length,
      name: item.Name,
      address: item.Address,
      budget: item.Budget,
      description: item.Description,
      latitude: item.Latitude,
      longitude: item.Longitude
    }
    this.dataToDisplay = [...this.dataToDisplay, newL];
    this.dataSource.setData(this.dataToDisplay);
  }

  viewLocation(index: any) {
    this.centerMap.emit({ latitude: this.dataToDisplay[index].latitude, longitude: this.dataToDisplay[index].longitude });
  }
  async deleteLocationFromTI(parameter: any) {
    const index = this.dataToDisplay.findIndex(date => parameter == date.index);
    await this.travelService.getLocationByLatLng(this.dataToDisplay[index].latitude, this.dataToDisplay[index].longitude).toPromise().then(async result => {
      await this.travelService.deleteLocationFromTravelItinerary(this.travelId, result.locationId).toPromise().then(
        (data: any) => {
          this.deleteLocation.emit(parameter);
        });
      await this.travelService.deleteUserExperience(Number(localStorage.getItem("userId")), this.travelId, result.locationId).toPromise().then((data: any) => { });

    })
    this.getLocationsTable(this.travelId);

  }
  async updateLocationInTI(parameter: any) {
    alert("To be Implemented")
  }

}

class ExampleDataSource extends DataSource<IDataSource> {
  private _dataStream = new ReplaySubject<IDataSource[]>();

  constructor(initialData: IDataSource[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IDataSource[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: IDataSource[]) {
    this._dataStream.next(data);
  }
}