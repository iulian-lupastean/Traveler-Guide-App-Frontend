import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/Interfaces/ILocation';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
import { TravelService } from 'src/app/services/travel.service';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { IDataSource } from 'src/app/Interfaces/IDataSource';
import { MatTable } from '@angular/material/table'; import { GetUserId } from '../../../Globals'

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.css'],
})
export class ViewTravelComponent implements OnInit {
  @Input()
  uniqueTravel!: ITravelItinerary;
  locations!: Observable<ILocation[]>;
  getTravel!: Observable<ITravelItinerary>;
  dataSource!: String[];
  getInfo: IDataSource[] = [];
  displayedColumns: string[] = ['name', 'address', 'budget', 'description'];

  @ViewChild(MatTable) table!: MatTable<IDataSource>;

  constructor(
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService,
    private router: Router
  ) { }

  ngOnInit() { }
  getLocations(travelId: number) {
    console.log(travelId);
    console.log(this.uniqueTravel)
    const ar: any = [];
    this.travelService.getLocationsForTravel(travelId).subscribe((data) => {
      data.forEach((element: any) => {
        this.travelService
          .getUserExperience(GetUserId.userId, travelId, element.locationId)
          .subscribe({
            next: (result) => {
              ar.push({
                name: element.name,
                address: element.address,
                budget: result.budget,
                description: result.description,
              });
              this.dataSource = ar;
              //this.table.renderRows();
            },
            error: (error) => {
              ar.push({
                name: element.name,
                address: element.address,
                budget: 0,
                description: '',
              });
              this.dataSource = ar;
              //this.table.renderRows();
            },
          });
      });
    });

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
}
