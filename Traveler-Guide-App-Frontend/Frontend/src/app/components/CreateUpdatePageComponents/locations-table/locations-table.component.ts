import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  dataSource!: String[];
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
    Description: ''
  };
  @ViewChild(MatTable) table!: MatTable<IDataSource>;
  travelId!: number;
  constructor(
    private travelService: TravelService,
    private updateTravelService: UpdateTravelService
  ) { }


  ngOnInit() {
    this.travelId = this.updateTravelService.getTravelId();
    this.getLocationsTable(this.travelId);

    console.log(this.locationAndUser.Address);
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
    }
    this.dataSource.push(newL)
    this.table.renderRows();
  }

  viewLocation(index: any) {
    console.log(
      this.dataSource[index]
    )
  }

}
