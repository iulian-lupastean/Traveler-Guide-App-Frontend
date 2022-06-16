import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
import { TravelService } from 'src/app/services/travel.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { IDataSource } from 'src/app/Interfaces/IDataSource';
import { MatTable } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.css'],
})
export class ViewTravelComponent implements OnInit {
  @Input()
  uniqueTravel!: ITravelItinerary;
  locations!: Observable<ILocation[]>;
  travelBudget!: string;
  getTravel!: Observable<ITravelItinerary>;
  dataSource = new ExampleDataSource([]);
  pipe = new DatePipe('en-US');
  getInfo: IDataSource[] = [];
  displayedColumns: string[] = ['name', 'address', 'budget', 'description'];
  dataToDisplay: any[] = [];
  travelId!: number
  @ViewChild(MatTable) table!: MatTable<IDataSource>;

  constructor(
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  getLocations(travelId: number) {
    this.dataToDisplay = [];
    this.travelService.getLocationsForTravel(travelId).subscribe((data) => {
      data.forEach((element: any, index: any) => {
        this.travelService
          .getUserExperience(Number(localStorage.getItem("userId")), travelId, element.locationId)
          .subscribe({
            next: (result) => {
              const arr = {
                index: index,
                name: element.name,
                address: element.address,
                budget: result.budget,
                description: result.description,
              };
              this.dataToDisplay = [...this.dataToDisplay, arr];
              this.dataSource.setData(this.dataToDisplay);
              //this.table.renderRows();
            },
            error: (error) => {
              const arr = {
                index: index,
                name: element.name,
                address: element.address,
                budget: 0,
                description: '',
              };
              this.dataToDisplay = [...this.dataToDisplay, arr];
              this.dataSource.setData(this.dataToDisplay);
              //this.table.renderRows();
            },
          });
      });
    });
    this.travelService.getBudget(Number(localStorage.getItem("userId")), travelId).subscribe((data) => {
      this.travelBudget = data.toLocaleString();
    });
  }
  removeLocations() {
    this.dataSource = new ExampleDataSource([])
  }
  viewTravel(travelId: number) {
    this.updateTravelService.setTravelId(travelId);
    this.router.navigate(['../showRoutes']);
  }
  updateTravel(travelId: number) {
    this.updateTravelService.setTravelId(travelId);
    this.travelService.getTravelItineraryById(travelId).subscribe((value) => {
      this.updateTravelService.setTravelInfo(value.name, value.travelDate);
      this.router.navigate(['../new-travel']);
    });
  }
  deleteTravel(id: number) {
    this.travelService.deleteTravelitinerary(id);
  }
  resetTravel() {
    this.updateTravelService.setTravelId(0)
    this.updateTravelService.setTravelInfo('', new Date())
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