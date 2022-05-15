import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';
@Component({
  selector: 'app-my-travels',
  templateUrl: './my-travels.component.html',
  styleUrls: ['./my-travels.component.css'],
})
export class MyTravelsComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  travelItineraries: ITravelItinerary[] = [];
  ngOnInit() {}
}
