import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface City{
  id:number;
  name:string;
  country:string;
}
interface Location{
  id:number;
  name:string;
  address:string;
  locationType:string;
  price:number;
  latitude:string;
  longitude:string;
  cityId:number;

}
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
cities:City[] = [];
locations:Location[] = [];
markers:any;
selectedCity:string ='' ;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getCities(); 
  }
  getCities() {

  this.http.get<City[]>('https://localhost:7075/api/Cities').subscribe(response => {
      this.cities = response;
      
    console.log(this.cities);
    },error => console.log(error));

  }
  getLocationsForCity(city:City)
  {
    console.log(city)
    this.http.get<Location[]>(`https://localhost:7075/api/Locations/${city.id}/Locations`).subscribe(response => {
      this.locations = response;
      console.log(response  );
      
      this.markers = this.placeAllMarkers(response);
      console.log(this.markers)
    },error=> console.log(error))
  }
  onCityChange(value:any) {
  let oras=<City> this.getCityByName(this.selectedCity);
  this.centerMapOnCity(oras.name);
  this.getLocationsForCity(oras);
  }
  getCityByName(city: string){
    var valoare = this.cities.find(element => element.name === city)
    return valoare;
  }
  centerMapOnCity(cityName: string,)
  {
if(cityName==='Madrid'){
      this.mapOptions ={
      zoom:13,
     center:{ lat:	40.416775 ,lng:-3.703790}
    }
  }
  else if(cityName==='Paris'){
        this.mapOptions ={
      zoom:13,
     center:{ lat:48.864716 ,lng:	2.349014}
    }}
  else if(cityName==='London'){
    this.mapOptions ={
      zoom:13,
     center:{ lat:	51.509865 ,lng:		-0.118092}
    }}
  else if(cityName==='Bucuresti'){
    this.mapOptions ={
      zoom:13,
     center:{ lat:	44.439663,lng:		26.096306}
    }}
    else if(cityName==='New York'){
    this.mapOptions ={
      zoom:13,
     center:{ lat:	40.730610 ,lng:		-73.935242}
    }}
      else if(cityName==='Berlin'){
    this.mapOptions ={
      zoom:13,
     center:{ lat:52.520008 ,lng:		13.404954}
    }}
      else if(cityName==='Los Angeles'){
    this.mapOptions ={
      zoom:13,
     center:{ lat:	34.052235 ,lng:		-118.243683}
    }}
      else if(cityName==='Prague'){
    this.mapOptions ={
      zoom:13,
     center:{ lat:	50.073658 ,lng:	14.418540}
    }}
  }
  placeAllMarkers(locations:Location[]){
  var markers =  locations.map(location =>{
      return {position:{lat:Number(location.latitude),lng: Number(location.longitude) }}
    });
    console.log(markers)
    return markers;
  }
  mapOptions: google.maps.MapOptions={
    disableDefaultUI:true,
        center:{ lat:	40.416775 ,lng:-3.703790},
        zoom:13
  };
 
}
